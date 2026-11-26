import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 is Next's default; 90 is used on the hero background photo, the
    // one image on the site where a touch more fidelity is worth the bytes.
    qualities: [75, 90],
  },
};

export default nextConfig;
