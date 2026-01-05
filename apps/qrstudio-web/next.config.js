
/** @type {import('next').NextConfig} */
const nextConfig = {

    // Fix for Vercel Monorepo deployment
    transpilePackages: ['@plaqode-platform/ui'],
    typescript: { ignoreBuildErrors: true }
};

module.exports = nextConfig;
