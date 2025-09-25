import PostList from "@/components/PostList";
import {getPostsServer} from "@/services/jsonplaceholder";

export const dynamic = "force-dynamic";

export default async function SSRPage() {
    const posts = await getPostsServer({ cache: "no-store" });

    return (
        <main style={{maxWidth:800, margin:"40px auto", padding:16}}>
            <h1>SSR: Server-Side Rendering</h1>
            <PostList posts={posts} />
        </main>
    );
}
