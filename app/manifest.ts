import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dolly's Tax & Advisory CPA, LLC",
    short_name: "Dolly's Tax",
    start_url: "/",
    display: "standalone",
    background_color: "#F4EFE7",
    theme_color: "#F4EFE7",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
