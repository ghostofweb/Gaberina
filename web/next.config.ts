import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Unsplash and Cloudinary are already image CDNs, so we build their URLs directly
    // instead of proxying through the Next.js optimizer.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    qualities: [75, 80],
  },
};

export default nextConfig;
