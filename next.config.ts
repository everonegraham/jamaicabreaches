import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't mis-infer it from a stray
  // lockfile in a parent directory.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
