import { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/landing',
                permanent: true, // Set to true for a 301 redirect, or false for a 302 redirect
            },
        ];
    },
};

export default nextConfig;