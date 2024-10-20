/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  fallbacks:{
    document: "/auth",
  }
});

export default withPWA({
  // Your Next.js config
  
});
