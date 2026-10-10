import { ImageResponse } from "next/og";
import { SITE_CONTENT } from "@/lib/site-content";
export const alt=`${SITE_CONTENT.brand}: ${SITE_CONTENT.tagline}`;
export const size={width:1200,height:630};
export const contentType="image/png";
export default function OpenGraphImage(){return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"72px",background:"#24233d",color:"white",fontFamily:"Arial"}}><div style={{display:"flex",alignItems:"center",gap:14,fontSize:25,fontWeight:700}}><div style={{width:38,height:38,borderRadius:11,background:"#8068e3",display:"flex",alignItems:"center",justifyContent:"center",fontSize:23}}>✳</div>{SITE_CONTENT.brand}</div><div style={{display:"flex",flexDirection:"column",gap:22}}><div style={{fontSize:17,letterSpacing:4,color:"#c8c0f3"}}>BUILT FOR THE NEXT OPPORTUNITY</div><div style={{fontSize:64,fontWeight:700,lineHeight:1.12,maxWidth:990}}>{SITE_CONTENT.tagline}</div><div style={{fontSize:24,color:"#c0bfd0",maxWidth:850}}>{SITE_CONTENT.portfolio.description}</div></div><div style={{display:"flex",justifyContent:"space-between",fontSize:16,color:"#aaa9bb",letterSpacing:2}}><span>PRODUCT DESIGN · AI · NEXT.JS</span><span>BY {SITE_CONTENT.owner.toUpperCase()}</span></div></div>,size)}

