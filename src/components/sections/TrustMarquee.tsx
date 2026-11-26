import { Container } from "@/components/ui/Section";
import Marquee from "@/components/motion/Marquee";
import { trustLogos } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";

export default function TrustMarquee() {
  return (
    <section className="border-y border-mist-200 bg-mist-50/60 py-10">
      <Container>
        <Reveal>
          <p className="mb-7 text-center text-[11px] font-semibold tracking-[0.2em] text-muted uppercase">
            Client coverage earned in
          </p>
        </Reveal>
      </Container>
      <Marquee speed={38}>
        {trustLogos.map((logo) => (
          <span
            key={logo}
            // .display's line-height (0.98) is tuned tight for stacked
            // headlines, where TextReveal/LineReveal pad for descenders.
            // This is a single line with none of that padding, so override
            // to a safe leading here — otherwise "Bloomberg"/"TechCrunch"
            // clip against the track's overflow-hidden mask edge.
            className="display shrink-0 pb-1 text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.3] whitespace-nowrap text-mist-400 transition-colors duration-500 hover:text-brand-500"
          >
            {logo}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
