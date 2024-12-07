/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
        };
        return config;
    },
    async rewrites() {
        return [
            {
                source: '/api-obter-maquinas',
                destination: 'https://limpomatic-9617a4f754e1.herokuapp.com/api-obter-maquinas',
            },
            {
                source: '/api-criar-produto',
                destination: 'https://limpomatic-9617a4f754e1.herokuapp.com/api-criar-produto',
            },
        ];
    },
};

export default nextConfig;
