import PostCard from "./PostCard";
import type { Post } from "@/types/post";

type PostListProps = {
    posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
    return (
        <div style={{ display: "grid", gap: 12 }}>
            {posts.map((p) => (
                <PostCard key={p.id} title={p.title} body={p.body} />
            ))}
        </div>
    );
}
