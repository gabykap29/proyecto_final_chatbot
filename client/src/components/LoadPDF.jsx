import { useRef, useContext } from "react";
import { FaRegFilePdf } from "react-icons/fa6";
import { useApiFetch } from "../hooks/useFetch";
import { useToast } from "../hooks/useToast";
import { PageContext } from "../context/AppContext";

export const LoadPDF = () => {

    const { refresh } = useContext(PageContext)

    const fileInputRef = useRef(null);

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await useApiFetch("/upload-pdf", "POST", formData, true)

            console.log(response);

            if (response.saved_path) {
                refresh()
                useToast(true, `PDF: ${response.filename} cargado exitosamente`)
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
