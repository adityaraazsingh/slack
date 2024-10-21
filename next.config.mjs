/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  fallbacks:{
    document: "/~offline",
  }
});

export default withPWA({
  // Your Next.js config
  eslint: {
    ignoreDuringBuilds: true,
}
});


// const nextConfig = {
//     eslint: {
//         ignoreDuringBuilds: true,
//     }

    
// };


// export default nextConfig;
