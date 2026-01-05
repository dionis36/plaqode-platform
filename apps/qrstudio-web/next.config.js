const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {

    // We trust our CI for type/lint checks, so we can skip them here to speed up deployment
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true }
};

module.exports = nextConfig;
