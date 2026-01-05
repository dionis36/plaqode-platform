
/** @type {import('next').NextConfig} */
const nextConfig = {

    // Fix for Vercel Monorepo deployment
    outputFileTracing: false,
    transpilePackages: ['@plaqode-platform/ui'],
    typescript: { ignoreBuildErrors: true }
};

module.exports = nextConfig;
