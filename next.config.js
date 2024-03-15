const path = require("path");

const nextConfig = {
  reactStrictMode: false,
  experimental: { esmExternals: true },
  transpilePackages: [
    "rc-util",
    "@ant-design",
    "kitchen-flow-editor",
    "@ant-design/pro-editor",
    "zustand",
    "leva",
    "antd",
    "rc-pagination",
    "rc-picker",
    "rc-util",
    "rc-pagination",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
  ],
  images: {
    domains: ["localhost", "example.com", "cdn.example.com"],
  },
  async rewrites() {
    return [
      {
        destination: "/auth/sign-in",
        source: "/login",
      },
      {
        source: "/api/:path*",
        destination: `${process.env.APP_BE}/api/:path*`,
      },
    ];
  },

  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    config.resolve.alias["@svgr/webpack"] = path.resolve(
      __dirname,
      "@svgr/webpack"
    );

    return config;
  },
};

module.exports = nextConfig;
