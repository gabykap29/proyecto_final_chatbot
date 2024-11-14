import { useEffect, useState, useContext } from 'react'
import { useApiFetch } from "../hooks/useFetch"
import { useToast } from "../hooks/useToast"
import { PageContext } from '../context/AppContext';

export const SelectPdf = () => {

    const [pdf, setPdf] = useState([])
    const [fistTime, setFirstTime] = useState(true)
    const [selectedPDF, setSelectedPDF] = useState('');
    const { updatePDF, refetchState, pdf: pdfSelected } = useContext(PageContext)

    // if (pdfSelected) {
    //     setSelectedPDF(pdfSelected)
    // }

    const handleSelectChange = (event) => {
        setSelectedPDF(event.target.value);
    };

    useEffect(() => {
        (async () => {
            const resp = await useApiFetch("/list-pdfs", "GET")
            setPdf(resp?.pdf_files)
        })()
    }, [refetchState])

    useEffect(() => {
        if (!fistTime) {
            (async () => {
                const resp = await useApiFetch("/process_pdf?file_name=" + selectedPDF, "POST", { file_name: selectedPDF })
                if (resp.message.includes("correctamente")) {
                    useToast(true, resp.message);
                } else {
                    useToast(false, resp.message);
                }

                localStorage.setItem("selectedPDF", selectedPDF)
                updatePDF(selectedPDF)
            })()
        } else {
            setFirstTime(false)
        }
    }, [selectedPDF])

    return (
        <>
            <select className='mx-2 rounded bg-neutral-700 text-neutral-200' id="pdfSelector" onChange={handleSelectChange} value={pdfSelected}>
                <option value="">Seleccione uno de los PDFs cargados previamente</option>
                {pdf?.map((file) => (
                    <option key={file.length}>
                        {file}
                    </option>
                ))}
            </select>
        </>
    )
}
