/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.json': ['json']
      }
    }
  }
}

export default nextConfig
