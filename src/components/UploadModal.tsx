import { useState, useMemo } from "react";
import Modal from "./Modal";

type UploadModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit?: (data: FormData) => Promise<void> | void;
};

export default function UploadModal({ open, onClose, onSubmit }: UploadModalProps) {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const fileInfo = useMemo(() => {
        if (!file) return null;
        const sizeKB = Math.round(file.size / 1024);
        return `${file.name} • ${sizeKB} KB`;
    }, [file]);

    const reset = () => {
        setTitle("");
        setFile(null);
        setError(null);
        setSubmitting(false);
    };

    const handleClose = () => {
        if (!submitting) {
            reset();
            onClose();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        setFile(f);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!title.trim()) {
            setError("Enter a title.");
            return;
        }
        if (!file) {
            setError("Select file.");
            return;
        }

        try {
            setSubmitting(true);
            const fd = new FormData();
            fd.append("title", title.trim());
            fd.append("file", file);

            if (onSubmit) {
                await onSubmit(fd);
            }

            reset();
            onClose();
        } catch (e: any) {
            setError(e?.message ?? "Sending error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal open={open} onClose={handleClose} title="Uploading file">
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
                <label style={{ display: "grid", gap: 6 }}>
                    <span style={{ fontSize: 14, color: "#555" }}>Title</span>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Input"
                        style={{
                            padding: "10px 12px",
                            borderRadius: 10,
                            border: "1px solid #ddd",
                            fontSize: 14,
                            outline: "none",
                        }}
                    />
                </label>

                <label style={{ display: "grid", gap: 6 }}>
                    <span style={{ fontSize: 14, color: "#555" }}>File</span>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ fontSize: 14 }}
                    />
                    {file && (
                        <div
                            style={{
                                fontSize: 12,
                                color: "#666",
                                border: "1px dashed #ddd",
                                borderRadius: 8,
                                padding: "8px 10px",
                            }}
                        >
                            {fileInfo}
                        </div>
                    )}
                </label>

                {error && <div style={{ color: "crimson", fontSize: 13 }}>{error}</div>}

                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={submitting}
                        style={{
                            padding: "10px 14px",
                            borderRadius: 10,
                            border: "1px solid #ddd",
                            background: "#fff",
                            cursor: "pointer",
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={submitting}
                        style={{
                            padding: "10px 14px",
                            borderRadius: 10,
                            border: "1px solid #0a66c2",
                            background: submitting ? "#9ec8f1" : "#1677ff",
                            color: "#fff",
                            cursor: submitting ? "not-allowed" : "pointer",
                            minWidth: 120,
                        }}
                    >
                        {submitting ? "Sending…" : "Download"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
