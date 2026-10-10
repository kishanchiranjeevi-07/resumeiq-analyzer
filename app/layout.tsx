import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONTENT } from "@/lib/site-content";
export const metadata:Metadata={...(process.env.NEXT_PUBLIC_SITE_URL?{metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL)}:{}),title:`${SITE_CONTENT.brand} — ${SITE_CONTENT.tagline}`,description:SITE_CONTENT.portfolio.description,openGraph:{type:"website",siteName:SITE_CONTENT.brand,title:`${SITE_CONTENT.brand} — ${SITE_CONTENT.tagline}`,description:SITE_CONTENT.portfolio.description},twitter:{card:"summary_large_image",title:`${SITE_CONTENT.brand} — ${SITE_CONTENT.tagline}`,description:SITE_CONTENT.portfolio.description}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}

