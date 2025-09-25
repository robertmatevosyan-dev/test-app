import { useState } from "react";
import { useWebSocketEcho } from "@/hooks/useWebSocketEcho";

export default function WebSocketDemo() {
    const { status, messages, error, send, connect, disconnect } = useWebSocketEcho();
    const [text, setText] = useState("");

    const canSend = status === "open";

    const handleSend = () => {
        if (!text.trim()) return;
        const ok = send(text.trim());
        if (ok) setText("");
    };

    const statusColor =
        status === "open" ? "#22c55e" :
            status === "connecting" ? "#f59e0b" :
                status === "error" ? "#ef4444" :
                    status === "closing" ? "#a855f7" :
                        "#6b7280";

    return (
        <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{
            width: 10, height: 10, borderRadius: 9999, background: statusColor, display: "inline-block"
        }} />
                <strong>Status:</strong> {status}
                <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                    <button onClick={connect} disabled={status === "open" || status === "connecting"}>Connect</button>
                    <button onClick={disconnect} disabled={status !== "open"}>Disconnect</button>
                </div>
            </div>

            {error && <div style={{ color: "crimson" }}>Error: {error}</div>}

            <div style={{ display: "flex", gap: 8 }}>
                <input
                    type="text"
                    value={text}
                    placeholder="Type message…"
                    onChange={(e) => setText(e.target.value)}
                    style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd" }}
                />
                <button
                    onClick={handleSend}
                    disabled={!canSend || !text.trim()}
                    style={{
                        padding: "10px 14px",
                        borderRadius: 10,
                        border: "1px solid #0a66c2",
                        background: canSend ? "#1677ff" : "#9ec8f1",
                        color: "#fff",
                        cursor: canSend ? "pointer" : "not-allowed",
                    }}
                >
                    Send
                </button>
            </div>

            <div style={{
                border: "1px solid #e5e5e5", borderRadius: 10, padding: 12, minHeight: 140,
                display: "grid", gap: 6, background: "#fafafa"
            }}>
                <strong>Messages:</strong>
                {messages.length === 0 ? (
                    <span style={{ color: "#666" }}>Write something.</span>
                ) : (
                    <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
                        {messages.map((m, i) => <li key={i} style={{ whiteSpace: "pre-wrap" }}>{m}</li>)}
                    </ul>
                )}
            </div>
        </div>
    );
}
