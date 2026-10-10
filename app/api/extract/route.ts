import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
export const runtime="nodejs";
export async function POST(req:Request){
 try { const form=await req.formData(); const file=form.get("file"); if(!(file instanceof File)) return NextResponse.json({error:"Choose a PDF or DOCX file."},{status:400});
  const max=Number(process.env.MAX_UPLOAD_MB||5)*1024*1024; if(file.size>max) return NextResponse.json({error:"File is too large. Maximum size is 5 MB."},{status:413});
  const bytes=Buffer.from(await file.arrayBuffer()); let text="";
  if(file.type==="application/pdf"||file.name.toLowerCase().endsWith(".pdf")){const out=await pdfParse(bytes);text=out.text;}
  else if(file.type==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||file.name.toLowerCase().endsWith(".docx")){text=(await mammoth.extractRawText({buffer:bytes})).value;}
  else return NextResponse.json({error:"Unsupported file. Upload a PDF or DOCX."},{status:415});
  text=text.trim().slice(0,30000); if(text.length<50)return NextResponse.json({error:"We couldn't find enough readable text. Try another file or paste the text."},{status:422}); return NextResponse.json({text});
 }catch{return NextResponse.json({error:"The document could not be parsed. Try another file or paste the resume text."},{status:422});}
}

