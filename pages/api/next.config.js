/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    VERIFY_ETH_ADDRESS: process.env.VERIFY_ETH_ADDRESS,
    VERIFY_BNB_ADDRESS: process.env.VERIFY_BNB_ADDRESS,
    VERIFY_TRON_ADDRESS: process.env.VERIFY_TRON_ADDRESS
  },
  output: 'standalone',
  poweredByHeader: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        bufferutil: false,
        'utf-8-validate': false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
