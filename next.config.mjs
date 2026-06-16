/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_R2_PUBLIC_URL: process.env.REACT_APP_R2_PUBLIC_URL || "",
  },
};

export default nextConfig;
