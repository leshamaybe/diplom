/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "s3.timeweb.cloud",
            },
        ],
    },
    ignoreDuringBuilds: true,
    distDir: "build",
};

export default nextConfig;
