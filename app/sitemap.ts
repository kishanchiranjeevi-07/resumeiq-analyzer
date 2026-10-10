import type { MetadataRoute } from "next";
export default function sitemap():MetadataRoute.Sitemap {
  const site=process.env.NEXT_PUBLIC_SITE_URL;
  if(!site)return [];
  return [{url:`${site.replace(/\/$/,"")}/portfolio`,lastModified:new Date(),changeFrequency:"monthly",priority:1}];
}

