"use client";

import { useEffect, useState } from "react";
import type { Post } from "@/types/post";

const BASE = "https://jsonplaceholder.typicode.com";

export function usePostsCSR(limit: number = 10) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setErr(null);

        (async () => {
            try {
                const res = await fetch(`${BASE}/posts?_limit=${limit}`, {
                    signal: controller.signal,
                });
                if (!res.ok) throw new Error("Failed to fetch posts");
                const data: Post[] = await res.json();
                setPosts(data);
            } catch (e: any) {
                if (e?.name !== "AbortError") setErr(e?.message ?? "Unknown error");
            } finally {
                setLoading(false);
            }
        })();

        return () => controller.abort();
    }, [limit]);

    return { posts, loading, err };
}
