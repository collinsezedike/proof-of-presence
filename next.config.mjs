/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // Enable App Router
    experimental: {
      appDir: true,
    },
  }
  
  export default nextConfig