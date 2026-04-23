import { withUI } from "@veehance/react/next";

export default withUI()({
  images: { remotePatterns: [new URL("https://logo.svgcdn.com/**")] },
  reactStrictMode: true,
});
