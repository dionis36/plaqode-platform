
/** @type {import('next').NextConfig} */
const nextConfig = {

    // Fix for Vercel Monorepo deployment
    output: 'standalone',
    transpilePackages: ['@plaqode-platform/ui'],
    typescript: { ignoreBuildErrors: true }
};

module.exports = nextConfig;
