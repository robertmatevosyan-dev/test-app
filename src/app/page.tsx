import Link from "next/link";

export default function HomePage() {
    return (
        <main style={{ maxWidth: 800, margin: "40px auto", padding: 16 }}>
            <h1>Next.js Rendering Modes</h1>
            <ul style={{ lineHeight: 1.8 }}>
                <li><Link href="/ssr">SSR — Server-Side Rendering</Link></li>
                <li><Link href="/ssg">SSG — Static Site Generation</Link></li>
                <li><Link href="/isr">ISR — Incremental Static Regeneration</Link></li>
                <li><Link href="/csr">CSR — Client-Side Rendering</Link></li>
                <li><Link href="/ws">WebSocket Demo</Link></li>
            </ul>
        </main>
    );
}
