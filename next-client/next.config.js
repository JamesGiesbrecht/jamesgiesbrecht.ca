/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: '/api/:slug*',
      destination: `http://localhost:3001/api/:slug*`,
    },
  ],
}

module.exports = nextConfig
