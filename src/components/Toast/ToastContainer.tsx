import { createPortal } from "react-dom";
import useToast from "./useToast";
import Toast from "./Toast";
import "./toast.css";

function ToastContainer() {
    const { toasts, removeToast } = useToast();

    return createPortal(<div className="toast__container">
        {toasts.slice(0, toasts.length).reverse().map((toast) => <Toast key={`${toast.id}`} {...toast} onClose={(id) => {
            toast.onClose?.(id);
            removeToast?.(id);
        }} />)}
    </div>, document.body)
}

export default ToastContainer;