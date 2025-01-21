import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
 domains: ["images.unsplash.com", "res.cloudinary.com"],
},
async headers() {
  return [
      {
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Methods", value: 'GET, POST, PUT, DELETE, OPTIONS' },
        { key: "Access-Control-Allow-Headers", value: 'Content-Type, Authorization' },
      ]
    },
  ];
},
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:5000/:path*',
    },
  ];  
},
};

export default nextConfig;
