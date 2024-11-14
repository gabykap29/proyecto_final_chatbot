import { useRef } from "react";
import { FaRegFilePdf } from "react-icons/fa6";
import { useApiFetch } from "../hooks/useFetch";
import { useToast } from "../hooks/useToast";

export const LoadPDF = () => {

    const fileInputRef = useRef(null);

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("pdf", file);

        try {
            const response = await useApiFetch("", "POST", formData)

            if (response.ok) {
                useToast(true, "PDF cargado exitosamente")
            } else {
                useToast(false, "Error cargado el PDF")
            }
        } catch (error) {
            useToast(false, "Error cargado el PDF")
        }
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="application/pdf"
                onChange={handleFileChange}
            />

            <i title='Sube un PDF para hablar con el chat' onClick={handleIconClick} className="cursor-pointer text-2xl text-neutral-200">
                <FaRegFilePdf />
            </i>
        </>
    )
}
