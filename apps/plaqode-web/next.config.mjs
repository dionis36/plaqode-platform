/** @type {import('next').NextConfig} */
const nextConfig = {
    // Explicitly transpile konva dependencies to prevent ESM/CJS issues
    transpilePackages: ['konva', 'react-konva', 'react-konva-utils', '@plaqode-platform/ui'],
    // Ensure we don't have strict mode conflicts with canvas
    reactStrictMode: true,
    webpack: (config) => {
        config.externals = [...config.externals, { canvas: "canvas" }];
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/q/:path*',
                destination: `${process.env.NEXT_PUBLIC_QRSTUDIO_API_URL}/:path*`,
            },
        ];
    },
};

export default nextConfig;
