"use client";

import WebSocketDemo from "@/components/WebSocketDemo";

export default function WSPage() {
    return (
        <main style={{ maxWidth: 800, margin: "40px auto", padding: 16 }}>
            <h1>WebSocket Demo</h1>
            <p>Connecting to WS echo server.</p>

            <WebSocketDemo />

            <hr style={{ margin: "24px 0" }} />
        </main>
    );
}
