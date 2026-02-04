import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://phoenixpulse.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://phoenixpulse.vercel.app/quotes",
      lastModified: new Date(),
    },
    {
      url: "https://phoenixpulse.vercel.app/blog",
      lastModified: new Date(),
    },
  ];
}