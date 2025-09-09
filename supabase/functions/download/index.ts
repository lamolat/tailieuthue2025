import { serve } from "https://deno.land/std/http/server.ts";
import { PDFDocument } from "npm:pdf-lib";

serve(async (req) => {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const file = url.searchParams.get("file");

  if (!code || !file) {
    return new Response("Thiếu mã hoặc tên file", { status: 400 });
  }

  // Tải file PDF gốc từ Supabase Storage
  const res = await fetch(`https://bmgdjrnqjoymyoaiwhlt.supabase.co/storage/v1/object/public/files/${file}`);
    return new Response("Không tìm thấy file", { status: 404 });
  }

  const originalPdf = await res.arrayBuffer();
  const pdfDoc = await PDFDocument.load(originalPdf);

  // Nhúng mã học sinh vào metadata
  pdfDoc.setKeywords([`student:${code}`]);
  const pdfBytes = await pdfDoc.save();

  return new Response(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${file}"`,
    },
  });
});
