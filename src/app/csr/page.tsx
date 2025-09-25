"use client";

import PostList from "@/components/PostList";
import {usePostsCSR} from "@/hooks/usePostsCSR";
import UploadModal from "@/components/UploadModal";
import {useState} from "react";

type UploadResponse = {
    ok: boolean;
    error?: string;
    title?: string;
    filename?: string;
    mime?: string;
    size?: number;
    sha256_16?: string;
};

export default function CSRPage() {
    const [open, setOpen] = useState(false);
    const [uploads, setUploads] = useState<UploadResponse[]>([]);
    const { posts, loading, err } = usePostsCSR();

    const handleSubmit = async (fd: FormData) => {
        const res = await fetch("/api/upload", {
            method: "POST",
            body: fd,
        });
        const json: UploadResponse = await res.json();
        if (!res.ok || !json.ok) {
            throw new Error(json.error ?? `Request failed with ${res.status}`);
        }
        setUploads(prev => [...prev, json]); // сохраняем в список
    };


    return (
        <main style={{maxWidth:800, margin:"40px auto", padding:16}}>
            <h1>CSR: Client-Side Rendering</h1>

            {loading && <p>Loading…</p>}
            {err && <p style={{color:'crimson'}}>Error: {err}</p>}

            <PostList posts={posts} />

            {uploads.length > 0 && (
                <div
                    style={{
                        marginTop: 20,
                        padding: 12,
                        border: "1px solid #e5e5e5",
                        borderRadius: 10,
                    }}
                >
                    <h3 style={{ marginTop: 0 }}>Uploads:</h3>
                    <ul style={{ paddingLeft: 20, lineHeight: 1.6 }}>
                        {uploads.map((u, i) => (
                            <li key={i}>
                                <strong>{u.title}</strong> — {u.filename}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                onClick={() => setOpen(true)}
                style={{
                    padding: "12px 16px",
                    marginTop: 12,
                    borderRadius: 12,
                    border: "1px solid #0a66c2",
                    background: "#1677ff",
                    color: "#fff",
                    cursor: "pointer",
                }}
            >
                Open modal
            </button>

            <UploadModal
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleSubmit}
            />
        </main>
    );
}
