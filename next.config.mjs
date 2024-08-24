/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false, // This is optional but can prevent canvas-related issues
    };

    config.module.rules.push({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[contenthash].[ext]",
            outputPath: "static/worker",
            publicPath: "/_next/static/worker",
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
