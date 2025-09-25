import type { Post } from "@/types/post";

const BASE = "https://jsonplaceholder.typicode.com";

/**
 * Серверный фетчер для App Router страниц (SSR/SSG/ISR).
 * Управляй кэшем и ISR через параметры.
 */
export async function getPostsServer(
    {
        limit = 10,
        cache = "force-cache",
        revalidate,
    }: {
        limit?: number;
        cache?: RequestCache;
        revalidate?: number;
    } = {}
): Promise<Post[]> {
    const url = `${BASE}/posts?_limit=${limit}`;

    const init: RequestInit & { next?: { revalidate: number } } = {};
    if (cache) init.cache = cache;
    if (typeof revalidate === "number") init.next = { revalidate };

    const res = await fetch(url, init);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
}
