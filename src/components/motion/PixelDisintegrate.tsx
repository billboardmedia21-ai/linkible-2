"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

/** Cursor-reactive "disintegrate to pixels and re-form" effect for a headline.
 *
 *  The real DOM text is never replaced: it stays the source of truth for SEO,
 *  screen readers, selection and the intro animation. When the pointer gets
 *  close to it, this component
 *    1. rasterises that exact text to an offscreen canvas (each glyph drawn
 *       at the x/y the browser itself laid it out at, read back via Range
 *       rects — so the swap is pixel-aligned rather than a re-typeset),
 *    2. cuts it into small square "pixels" (one particle per cell),
 *    3. pushes those away from the cursor and springs them back home, and
 *    4. hides the DOM text only while any pixel is away from home, handing
 *       back to the crisp DOM text once everything has re-integrated.
 *  Only particles that have actually moved are redrawn each frame; the rest
 *  of the headline is a single static bitmap, so the cost stays small. */

// Canvas margin around the text (CSS px) so pixels can fly outside its box.
const PAD = 110;
// The hero headline's own intro (TextReveal + LineReveal, ~1.7s) must finish
// before glyph positions are final; nothing is measured before this.
const READY_DELAY = 2400;

type Atlas = {
  w: number;
  h: number;
  dpr: number;
  size: number; // particle edge, CSS px
  text: HTMLCanvasElement; // crisp static render of the whole headline
  n: number;
  hx: Float32Array;
  hy: Float32Array;
  x: Float32Array;
  y: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  k: Float32Array; // per-particle spring stiffness (staggers the re-form)
  mag: Float32Array; // per-particle push strength
  cos: Float32Array; // per-particle fixed scatter angle (cos/sin of it)
  sin: Float32Array;
  disp: Uint8Array; // 1 while a particle is away from home this frame
  bStart: Int32Array; // particles are sorted by colour bucket; ranges here
  colors: string[];
};

const rand = (seed: number) => {
  // Cheap deterministic hash → [0,1); keeps builds reproducible and avoids
  // Math.random in a hot init loop.
  const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

function readBrandStops(): [string, string, string] {
  const probe = document.createElement("span");
  probe.style.display = "none";
  document.body.appendChild(probe);
  const read = (token: string, fallback: string) => {
    probe.style.color = fallback;
    probe.style.color = `var(${token}, ${fallback})`;
    return getComputedStyle(probe).color;
  };
  const stops: [string, string, string] = [
    read("--color-brand-600", "#1b47e8"),
    read("--color-brand-500", "#3b6bff"),
    read("--color-brand-700", "#1638c4"),
  ];
  probe.remove();
  return stops;
}

function buildAtlas(host: HTMLElement, content: HTMLElement, particle: number): Atlas | null {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const hostRect = host.getBoundingClientRect();
  if (!host.offsetWidth || !host.offsetHeight) return null;
  // Ancestors (the hero's scroll parallax) may be scaling us right now.
  // Measure everything in un-transformed CSS px.
  const scale = hostRect.width / host.offsetWidth || 1;
  const w = Math.ceil(host.offsetWidth + PAD * 2);
  const h = Math.ceil(host.offsetHeight + PAD * 2);

  const text = document.createElement("canvas");
  text.width = Math.round(w * dpr);
  text.height = Math.round(h * dpr);
  const ctx = text.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.scale(dpr, dpr);
  ctx.textBaseline = "alphabetic";

  const stops = readBrandStops();
  const range = document.createRange();
  const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
  let drewAny = false;

  for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
    if (!node.data.trim()) continue;
    const el = node.parentElement;
    if (!el) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none") continue;

    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const m = ctx.measureText("Hg");
    // The DOM rounds font ascent to whole px when it builds a text box; a
    // Range rect's top is that box's top, so baseline = top + rounded ascent.
    const ascent = Math.round(m.fontBoundingBoxAscent ?? parseFloat(cs.fontSize) * 0.8);

    // Gradient-clipped text (the second headline line) paints its colour via
    // background-clip:text, so `color` alone would draw it in the wrong ink.
    let clipEl: HTMLElement | null = null;
    for (let a: HTMLElement | null = el; a && a !== content.parentElement; a = a.parentElement) {
      if (getComputedStyle(a).backgroundClip === "text") {
        clipEl = a;
        break;
      }
    }
    if (clipEl) {
      const r = clipEl.getBoundingClientRect();
      const x0 = (r.left - hostRect.left) / scale + PAD;
      const x1 = (r.right - hostRect.left) / scale + PAD;
      const g = ctx.createLinearGradient(x0, 0, x1, 0);
      g.addColorStop(0, stops[0]);
      g.addColorStop(0.5, stops[1]);
      g.addColorStop(1, stops[2]);
      ctx.fillStyle = g;
    } else {
      ctx.fillStyle = cs.color;
    }

    // Draw glyph by glyph at the browser's own pen positions. This inherits
    // its kerning and negative letter-spacing exactly, and works in browsers
    // whose canvas lacks `letterSpacing`.
    for (let i = 0; i < node.data.length; i++) {
      const ch = node.data[i];
      if (ch.trim() === "") continue;
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const r = range.getBoundingClientRect();
      if (r.width === 0) continue;
      ctx.fillText(
        ch,
        (r.left - hostRect.left) / scale + PAD,
        (r.top - hostRect.top) / scale + PAD + ascent,
      );
      drewAny = true;
    }
  }
  if (!drewAny) return null;

  // ---- Cut the bitmap into cells; each cell with any ink becomes a pixel.
  const step = Math.max(2, Math.round(particle * dpr)); // device px per cell
  const W = text.width;
  const H = text.height;
  const cols = Math.ceil(W / step);
  const rows = Math.ceil(H / step);
  const cellAlpha = new Uint8Array(cols * rows);
  const cellRGB = new Uint32Array(cols * rows);
  const data = ctx.getImageData(0, 0, W, H).data;
  for (let y = 0; y < H; y++) {
    const rowBase = Math.floor(y / step) * cols;
    for (let x = 0; x < W; x++) {
      const p = (y * W + x) * 4;
      const a = data[p + 3];
      if (a === 0) continue;
      const c = rowBase + Math.floor(x / step);
      if (a > cellAlpha[c]) {
        cellAlpha[c] = a;
        cellRGB[c] = (data[p] << 16) | (data[p + 1] << 8) | data[p + 2];
      }
    }
  }

  // Bucket cells by (quantised colour, alpha level) so a frame draws one path
  // per bucket instead of one fillStyle change per particle.
  const bucketOf = new Map<number, number>();
  const bucketColors: string[] = [];
  const cellBucket = new Int32Array(cols * rows).fill(-1);
  let count = 0;
  for (let c = 0; c < cellAlpha.length; c++) {
    const a = cellAlpha[c];
    if (a < 12) continue;
    const rgb = cellRGB[c];
    const level = a > 200 ? 3 : a > 120 ? 2 : 1;
    const key = (((rgb >> 16) & 0xff) >> 3) << 15 | (((rgb >> 8) & 0xff) >> 3) << 10 | ((rgb & 0xff) >> 3) << 5 | level;
    let b = bucketOf.get(key);
    if (b === undefined) {
      b = bucketColors.length;
      bucketOf.set(key, b);
      const alpha = level === 3 ? 1 : level === 2 ? 0.66 : 0.33;
      bucketColors.push(`rgba(${(rgb >> 16) & 0xff},${(rgb >> 8) & 0xff},${rgb & 0xff},${alpha})`);
    }
    cellBucket[c] = b;
    count++;
  }
  if (!count) return null;

  const nb = bucketColors.length;
  const bStart = new Int32Array(nb + 1);
  const perBucket = new Int32Array(nb);
  for (let c = 0; c < cellBucket.length; c++) if (cellBucket[c] >= 0) perBucket[cellBucket[c]]++;
  for (let b = 0; b < nb; b++) bStart[b + 1] = bStart[b] + perBucket[b];
  const cursor = bStart.slice(0, nb);

  const at: Atlas = {
    w,
    h,
    dpr,
    size: step / dpr,
    text,
    n: count,
    hx: new Float32Array(count),
    hy: new Float32Array(count),
    x: new Float32Array(count),
    y: new Float32Array(count),
    vx: new Float32Array(count),
    vy: new Float32Array(count),
    k: new Float32Array(count),
    mag: new Float32Array(count),
    cos: new Float32Array(count),
    sin: new Float32Array(count),
    disp: new Uint8Array(count),
    bStart,
    colors: bucketColors,
  };
  for (let c = 0; c < cellBucket.length; c++) {
    const b = cellBucket[c];
    if (b < 0) continue;
    const i = cursor[b]++;
    const hx = ((c % cols) * step) / dpr;
    const hy = (Math.floor(c / cols) * step) / dpr;
    at.hx[i] = at.x[i] = hx;
    at.hy[i] = at.y[i] = hy;
    at.k[i] = 0.012 + rand(i + 1) * 0.026;
    at.mag[i] = 0.45 + rand(i + 7) * 1.1;
    const ang = (rand(i + 13) - 0.5) * 2.2; // ±~63° off the radial direction
    at.cos[i] = Math.cos(ang);
    at.sin[i] = Math.sin(ang);
  }
  return at;
}

export default function PixelDisintegrate({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const content = host?.firstElementChild as HTMLElement | null;
    if (!host || !canvas || !content || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const small = window.matchMedia("(max-width: 640px)").matches;
    const RADIUS = small ? 78 : 132;
    const PUSH = small ? 3.2 : 3.6;

    let atlas: Atlas | null = null;
    let ready = false;
    let raf = 0;
    let last = 0;
    let swapped = false;
    let disposed = false;
    const ptr = { on: false, x: 0, y: 0, vx: 0, vy: 0, burst: 0 };

    const build = () => {
      if (disposed || atlas || !ready) return;
      const a = buildAtlas(host, content, small ? 2 : 3);
      if (!a) return;
      atlas = a;
      canvas.width = Math.round(a.w * a.dpr);
      canvas.height = Math.round(a.h * a.dpr);
      canvas.style.width = `${a.w}px`;
      canvas.style.height = `${a.h}px`;
      canvas.style.left = `${-PAD}px`;
      canvas.style.top = `${-PAD}px`;
    };

    const setSwapped = (on: boolean) => {
      if (swapped === on) return;
      swapped = on;
      if (on) host.setAttribute("data-pixel", "on");
      else {
        host.removeAttribute("data-pixel");
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const frame = (t: number) => {
      raf = 0;
      const a = atlas;
      if (!a) return;
      const dt = Math.min(2, last ? (t - last) / 16.667 : 1);
      last = t;
      const damp = Math.pow(0.9, dt);
      const R2 = RADIUS * RADIUS;
      const { n, hx, hy, x, y, vx, vy, k, mag, cos, sin, disp } = a;
      const burst = ptr.burst;
      ptr.burst = 0;
      const burstR2 = (RADIUS * 1.9) ** 2;
      let any = false;

      for (let i = 0; i < n; i++) {
        if (ptr.on) {
          const dx = x[i] - ptr.x;
          const dy = y[i] - ptr.y;
          const d2 = dx * dx + dy * dy;
          const r2 = burst ? burstR2 : R2;
          if (d2 < r2) {
            const d = Math.sqrt(d2) || 1;
            const rr = Math.sqrt(r2);
            let f = 1 - d / rr;
            f *= f;
            const ux = dx / d;
            const uy = dy / d;
            // Radial push, rotated by this particle's own fixed scatter angle
            // so the cloud breaks apart rather than bulging as one smooth lens.
            const px = ux * cos[i] - uy * sin[i];
            const py = ux * sin[i] + uy * cos[i];
            const p = f * PUSH * mag[i] * (burst ? 3.4 : 1) * dt;
            vx[i] += px * p + ptr.vx * f * 0.1;
            vy[i] += py * p + ptr.vy * f * 0.1;
          }
        }
        vx[i] += (hx[i] - x[i]) * k[i] * dt;
        vy[i] += (hy[i] - y[i]) * k[i] * dt;
        vx[i] *= damp;
        vy[i] *= damp;
        x[i] += vx[i] * dt;
        y[i] += vy[i] * dt;

        const ex = x[i] - hx[i];
        const ey = y[i] - hy[i];
        if (ex * ex + ey * ey < 0.09 && vx[i] * vx[i] + vy[i] * vy[i] < 0.004) {
          x[i] = hx[i];
          y[i] = hy[i];
          vx[i] = vy[i] = 0;
          disp[i] = 0;
        } else {
          disp[i] = 1;
          any = true;
        }
      }
      ptr.vx *= 0.8;
      ptr.vy *= 0.8;

      if (any) setSwapped(true);
      if (swapped && (any || ptr.on)) {
        const { dpr, w, h, size, text, bStart, colors } = a;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(text, 0, 0, w, h);
        // Lift the displaced pixels out of the static bitmap… destination-out
        // removes ink in proportion to the fill's alpha, and fillStyle still
        // holds last frame's (semi-transparent) bucket colour — so it must be
        // reset to opaque or the cells only half-erase and leave grey ghosts.
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "#000";
        ctx.beginPath();
        for (let i = 0; i < n; i++) if (disp[i]) ctx.rect(hx[i], hy[i], size, size);
        ctx.fill();
        // …and draw them where they currently are, snapped to device pixels
        // so they read as crisp square pixels rather than soft dots.
        ctx.globalCompositeOperation = "source-over";
        for (let b = 0; b < colors.length; b++) {
          let any2 = false;
          ctx.beginPath();
          for (let i = bStart[b]; i < bStart[b + 1]; i++) {
            if (!disp[i]) continue;
            ctx.rect(Math.round(x[i] * dpr) / dpr, Math.round(y[i] * dpr) / dpr, size, size);
            any2 = true;
          }
          if (any2) {
            ctx.fillStyle = colors[b];
            ctx.fill();
          }
        }
      }

      if (any || ptr.on) raf = requestAnimationFrame(frame);
      else {
        // Everything has re-formed and the pointer is gone: hand back to the
        // crisp DOM text and stop the loop entirely.
        last = 0;
        setSwapped(false);
      }
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const s = atlas ? r.width / atlas.w || 1 : 1;
      return { x: (e.clientX - r.left) / s, y: (e.clientY - r.top) / s };
    };

    const onMove = (e: PointerEvent) => {
      if (!ready) return;
      if (!atlas) build();
      if (!atlas) return;
      const p = local(e);
      if (ptr.on) {
        ptr.vx = ptr.vx * 0.5 + (p.x - ptr.x) * 0.5;
        ptr.vy = ptr.vy * 0.5 + (p.y - ptr.y) * 0.5;
      }
      ptr.x = p.x;
      ptr.y = p.y;
      ptr.on = true;
      wake();
    };
    const onLeave = () => {
      ptr.on = false;
      wake();
    };
    const onDown = (e: PointerEvent) => {
      onMove(e);
      ptr.burst = 1; // a tap/click detonates a wider ring
      wake();
    };

    // Any layout change invalidates the bitmap; rebuild lazily next time.
    const invalidate = () => {
      atlas = null;
      ptr.on = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      setSwapped(false);
      if (ready) schedule();
    };
    let idle = 0;
    const schedule = () => {
      window.clearTimeout(idle);
      idle = window.setTimeout(build, 250);
    };

    const readyTimer = window.setTimeout(() => {
      ready = true;
      // Web fonts must be loaded, or glyph metrics would be the fallback's.
      document.fonts.ready.then(() => !disposed && schedule());
    }, READY_DELAY);

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerdown", onDown);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointercancel", onLeave);
    const ro = new ResizeObserver(() => {
      if (atlas) invalidate();
    });
    ro.observe(host);

    return () => {
      disposed = true;
      window.clearTimeout(readyTimer);
      window.clearTimeout(idle);
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointercancel", onLeave);
      host.removeAttribute("data-pixel");
    };
  }, [reduced]);

  return (
    <div ref={hostRef} className="pixel-host relative">
      <div className="pixel-content">{children}</div>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute" />
    </div>
  );
}
