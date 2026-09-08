import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";
import { resolve } from "path";

const nextConfig: NextConfig = {
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.worldvectorlogo.com',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
    ],
  },
};

const videoConfig = withNextVideo(nextConfig);

const originalWebpack = videoConfig.webpack;
videoConfig.webpack = function patchedWebpack(config: any, options: any) {
  const result = originalWebpack ? originalWebpack(config, options) : config;

  if (result.module?.generator) {
    for (const [, gen] of Object.entries(result.module.generator as Record<string, any>)) {
      if (gen && typeof gen === "object" && "filename" in gen) {
        delete gen.filename;
      }
    }
  }

  const Webpack = require("webpack");
  result.plugins.push(
    new Webpack.NormalModuleReplacementPlugin(
      /^three$/,
      (resource: any) => {
        if (resource.context && resource.context.includes("threeui")) {
          resource.request = resolve(process.cwd(), "patches/three-compat.js");
        }
      }
    )
  );

  return result;
};

export default videoConfig;