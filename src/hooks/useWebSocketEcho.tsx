import { useEffect, useRef, useState, useCallback } from "react";

type Status = "idle" | "connecting" | "open" | "closing" | "closed" | "error";

export function useWebSocketEcho(
    url: string = "wss://echo.websocket.org"
) {
    const wsRef = useRef<WebSocket | null>(null);
    const [status, setStatus] = useState<Status>("idle");
    const [messages, setMessages] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const connect = useCallback(() => {
        if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
            return;
        }
        setError(null);
        setStatus("connecting");
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => setStatus("open");
        ws.onclose = () => setStatus("closed");
        ws.onerror = (e) => {
            setStatus("error");
            setError("WebSocket error");
        };
        ws.onmessage = (evt) => {
            const data = typeof evt.data === "string" ? evt.data : String(evt.data);
            setMessages((prev) => [...prev, data]);
        };
    }, [url]);

    const disconnect = useCallback(() => {
        const ws = wsRef.current;
        if (!ws) return;
        setStatus("closing");
        ws.close(1000, "client-close");
    }, []);

    const send = useCallback((text: string) => {
        const ws = wsRef.current;
        if (!ws || ws.readyState !== WebSocket.OPEN) return false;
        ws.send(text);
        return true;
    }, []);

    useEffect(() => {
        connect();
        return () => {
            try { wsRef.current?.close(1000, "unmount"); } catch {}
            wsRef.current = null;
        };
    }, [connect]);

    return { status, messages, error, send, connect, disconnect };
}
