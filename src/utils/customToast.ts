import { toast } from "sonner";

export const CUSTOM_TOAST = {
    success: (message: string) => {
        toast.success(message, {
            duration: 1500,
            position: "top-right",
            closeButton: true,
            style: {
                backgroundColor: "hsl(143, 85%, 96%)",
                borderColor: "hsl(143, 85%, 74%)",
                color: "hsl(143, 85%, 27%)",
            },
            className: "border-l-4 border-l-green-500",
        });
    },

    error: (message: string) => {
        toast.error(message, {
            duration: 2500,
            position: "top-right",
            closeButton: true,
            style: {
                backgroundColor: "hsl(359, 100%, 97%)",
                borderColor: "hsl(359, 100%, 80%)",
                color: "hsl(359, 70%, 30%)",
            },
            className: "border-l-4 border-l-red-600",
        });
    },

    warn: (message: string) => {
        toast.warning(message, {
            duration: 2200,
            position: "top-right",
            closeButton: true,
            style: {
                backgroundColor: "hsl(48, 96%, 89%)",
                borderColor: "hsl(48, 96%, 70%)",
                color: "hsl(48, 70%, 30%)",
            },
            className: "border-l-4 border-l-amber-500",
        });
    },

    info: (message: string) => {
        toast.info(message, {
            duration: 1800,
            position: "top-right",
            closeButton: true,
            style: {
                backgroundColor: "hsl(210, 100%, 97%)",
                borderColor: "hsl(210, 100%, 75%)",
                color: "hsl(210, 70%, 30%)",
            },
            className: "border-l-4 border-l-blue-500",
        });
    },
};