import PostList from "@/components/PostList";
import {getPostsServer} from "@/services/jsonplaceholder";

export default async function SSGPage() {
    const posts = await getPostsServer();

    return (
        <main style={{maxWidth:800, margin:"40px auto", padding:16}}>
            <h1>SSG: Static Site Generation</h1>
            <PostList posts={posts} />
        </main>
    );
}
