export default function PostCard({ title, body }: { title: string; body: string }) {
    return (
        <article style={{border:'1px solid #e0e0e0', borderRadius:12, padding:16}}>
            <h3 style={{margin:'0 0 8px'}}>{title}</h3>
            <p style={{margin:0, opacity:.8}}>{body}</p>
        </article>
    );
}
