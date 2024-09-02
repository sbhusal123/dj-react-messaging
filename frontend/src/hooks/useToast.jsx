import { toast, Bounce } from "react-toastify";

export default function useToast(){

    const toastError = (title) => {
        toast.error(title, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    const toastInfo = (title) => {
        toast.success(title, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })
    }

    return {
        toastError,
        toastInfo
    }
}
