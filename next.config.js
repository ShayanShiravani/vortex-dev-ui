/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: false, // useEffect runs twice  in this mode 
  swcMinify: true,
}

module.exports = nextConfig
