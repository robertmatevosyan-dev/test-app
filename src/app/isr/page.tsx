import PostList from "@/components/PostList";
import {getPostsServer} from "@/services/jsonplaceholder";

export default async function ISRPage() {
    const posts = await getPostsServer({revalidate: 60});

    return (
        <main style={{maxWidth:800, margin:"40px auto", padding:16}}>
            <h1>ISR: Incremental Static Regeneration</h1>
            <p>The page will be rebuilt every 60 seconds.</p>
            <PostList posts={posts} />
        </main>
    );
}
