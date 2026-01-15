import { toast } from "sonner";

export const CUSTOM_TOAST = {
    success: (message: string) => {
        toast.success(message, {
            duration: 1500,
            position: 'top-right',
            closeButton: true,
        })
    },

    error: (message: string) => {
        toast.error(message, {
            duration: 1500,
            position: 'top-right',
            closeButton: true,
        })
    },

    warn: (message: string) => {
        toast.warning(message, {
            duration: 1500,
            position: 'top-right',
            closeButton: true,
        })
    },

    info: (message: string) => {
        toast.info(message, {
            duration: 1500,
            position: 'top-right',
            closeButton: true,
        })
    }
};