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
      {
        protocol: "https",
        hostname: "www.propertyfinder.ae",
        port: "",
        pathname: "/**", // Allow all paths
      },
      {
        protocol: "https",
        hostname: "pf-graph-images-production.s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "/**", // Allow all paths
      },
    ],
  },
};
