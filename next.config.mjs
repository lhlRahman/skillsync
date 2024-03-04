/** @type {import('next').NextConfig} */
// const nextConfig = {
//   headers: () => [
//     {
//       source: "/:path*",
//       headers: [
//         {
//           key: "Cache-Control",
//           value: "no-store",
//         },
//       ],
//     },
//   ],
//   images: {
//     domains: ["vastphotos.com"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "vastphotos.com/",
//       },
//     ],
//   },
// };

// export default nextConfig;

export default {
  headers: () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
  ],
};
