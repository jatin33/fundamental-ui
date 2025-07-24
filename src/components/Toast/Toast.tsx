import { useEffect } from "react";
import type { IToast } from "./types";


type Props = IToast;

function Toast({ id, message, createdAt, duration = 1000, type = "default", onClose }: Props) {
    useEffect(() => {
        const now = Date.now();
        const elapsed = now - (createdAt ?? now);
        const remaining = Math.max(duration - elapsed, 0);

        const timerId = setTimeout(() => {
            onClose?.(id);
        }, remaining);

        return () => clearTimeout(timerId);
    }, [duration, id, onClose, createdAt]);

    return <div key={`${id}`} role="alert" className={`toast ${type}`}>
        <div className="toast__action">
            <button aria-label="Close" onClick={() => {
                onClose?.(id);
            }}>x</button>
        </div>
        <p>{message}</p>
    </div>;
}

export default Toast;