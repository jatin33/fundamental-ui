import { createContext, useCallback, useState } from "react";
import type { IToast } from "./types";

type Props = {
    maxSnackBar: number;
    children: React.ReactNode;
}

interface IToastContext {
    toasts: Array<IToast>;
    maxSnackBar: number;
    addToast?: (toast: IToast) => void;
    removeToast?: (id?: number) => void;
}

export const ToastContext = createContext<IToastContext>({
    toasts: [],
    maxSnackBar: 3,
});

function ToastProvider({ maxSnackBar, children }: Props) {
    const [toasts, setToasts] = useState<Array<IToast>>([]);

    const addToast = useCallback((toast: IToast) => {
        setToasts((s) => {
            const newToast = {
                ...toast,
                id: Date.now() + Math.floor(Math.random() * 1000),
                createdAt: Date.now(),
            };
            console.log("Adding toast to state:", newToast);
            return [...s, newToast];
        });
    }, []);

    const removeToast = useCallback((id?: number) => {
        if (!id) return;
        setToasts((s) => s.filter((toast) => toast.id !== id));
    }, []);

    const contextValue = {
        toasts,
        maxSnackBar,
        addToast,
        removeToast
    };

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
        </ToastContext.Provider>
    );
}

export default ToastProvider;