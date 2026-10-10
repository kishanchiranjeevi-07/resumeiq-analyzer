import type { MetadataRoute } from "next";
export default function robots():MetadataRoute.Robots {
  const site=process.env.NEXT_PUBLIC_SITE_URL;
  return site?{rules:{userAgent:"*",allow:"/"},sitemap:`${site.replace(/\/$/,"")}/sitemap.xml`}:{rules:{userAgent:"*",disallow:"/"}};
}

