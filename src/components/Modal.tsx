import { useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
};

export default function Modal({ open, onClose, title, children }: ModalProps) {
    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = original;
        };
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <div
            aria-modal="true"
            role="dialog"
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.5)",
                display: "grid",
                placeItems: "center",
                zIndex: 1000,
                padding: 16,
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: "100%",
                    maxWidth: 520,
                    borderRadius: 16,
                    background: "#fff",
                    boxShadow: "0 10px 30px rgba(0,0,0,.2)",
                    overflow: "hidden",
                }}
            >
                <header
                    style={{
                        padding: "16px 20px",
                        borderBottom: "1px solid #eee",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <h3 style={{ margin: 0, fontSize: 18 }}>{title ?? "Modal"}</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        style={{
                            border: "none",
                            background: "transparent",
                            fontSize: 22,
                            cursor: "pointer",
                            lineHeight: 1,
                        }}
                    >
                        ×
                    </button>
                </header>

                <div style={{ padding: 20 }}>{children}</div>
            </div>
        </div>,
        document.body
    );
}
