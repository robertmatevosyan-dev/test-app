import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

export async function POST(req: NextRequest) {
    try {
        const form = await req.formData();
        const title = form.get("title");
        const file = form.get("file") as File | null;

        if (typeof title !== "string" || !title.trim()) {
            return NextResponse.json({ ok: false, error: "Title is required" }, { status: 400 });
        }
        if (!file) {
            return NextResponse.json({ ok: false, error: "File is required" }, { status: 400 });
        }

        const bytes = Buffer.from(await file.arrayBuffer());
        const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 16);

        return NextResponse.json({
            ok: true,
            title: title.trim(),
            filename: file.name,
            mime: file.type,
            size: bytes.byteLength,
            sha256_16: hash,
        });
    } catch (e: any) {
        return NextResponse.json({ ok: false, error: e?.message ?? "Upload error" }, { status: 500 });
    }
}
