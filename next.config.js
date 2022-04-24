/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MORALIS_SERVER_URL: process.env.MORALIS_SERVER_URL,
    MORALIS_APPLICATION_ID: process.env.MORALIS_APPLICATION_ID,
    CLIENT_ID: process.env.CLIENT_ID,
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
    RPC_URL: process.env.RPC_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    FACTORY_ADDRESS: process.env.FACTORY_ADDRESS,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME
  }
}

module.exports = nextConfig
