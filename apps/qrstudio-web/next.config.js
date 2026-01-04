/** @type {import('next').NextConfig} */
const nextConfig = {
    // Fix for Vercel "ENOENT: no such file or directory" trace error - Re-enabling to fix dynamic routes
    // outputFileTracing: false,
    // We trust our CI for type/lint checks, so we can skip them here to speed up deployment
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true }
};

module.exports = nextConfig;
