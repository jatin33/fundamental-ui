import { useContext } from "react";
import { ToastContext } from "./ToastProvider";

function useToast() {
    const context = useContext(ToastContext);
    
    console.log("useToast called, context:", context);
    console.log("addToast function:", context.addToast);
    console.log("toasts array:", context.toasts);
    
    // Check if we're inside a provider
    if (context === undefined) {
        console.error("useToast must be used within a ToastProvider");
        throw new Error("useToast must be used within a ToastProvider");
    }

    const { toasts, addToast, removeToast } = context;

    return {
        toasts,
        addToast,
        removeToast
    }
}

export default useToast;