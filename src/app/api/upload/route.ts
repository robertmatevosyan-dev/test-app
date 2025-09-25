import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

export const runtime = "nodejs";

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

        const ab = await file.arrayBuffer();
        const bytes = Buffer.from(ab);
        const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 16);

        return NextResponse.json({
            ok: true,
            title: title.trim(),
            filename: file.name,
            mime: file.type,
            size: bytes.byteLength,
            sha256_16: hash,
        });
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Upload error";
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
