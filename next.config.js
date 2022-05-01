const withPWA = require("next-pwa");
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
    FACTORY_ADDRESS: "0x6589f7506d87FC99a0c40dF0aC5240Db140DD749",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    mode: "production",
  },
};

module.exports = withPWA(nextConfig);
