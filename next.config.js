/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.bayut.com",
        port: "",
        pathname: "/thumbnails/**",
      },
    ],
  },
};