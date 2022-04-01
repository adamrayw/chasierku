/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    loader: "cloudinary",
    domains: ["res.cloudinary.com"],
  },
};
