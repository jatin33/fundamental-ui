
export type ToastVariant = "success" | "error" | "default";

export interface IToast {
    id?: number;
    message: string;
    type?: ToastVariant; 
    duration?: number
    createdAt?: number;
    onClose?: (id?: number) => void;
};
