import { useEffect, useState } from 'react'
import { useApiFetch } from "../hooks/useFetch"

export const SelectPdf = () => {

    const [pdf, setPdf] = useState([])
    const [fistTime, setFirstTime] = useState(true)

    const [selectedPDF, setSelectedPDF] = useState('');

    const handleSelectChange = (event) => {
        setSelectedPDF(event.target.value);
    };

    useEffect(() => {
        (async () => {
            const resp = await useApiFetch("/list-pdfs", "GET")
            setPdf(resp?.pdf_files)
        })()
    }, [])

    useEffect(() => {
        if (!fistTime) {
            (async () => {
                const resp = await useApiFetch("/process_pdf?file_name=" + selectedPDF, "POST", { file_name: selectedPDF })
                setPdf(resp?.pdf_files)
                console.log(resp);
            })()
        } else {
            setFirstTime(false)
        }
    }, [selectedPDF])

    console.log(selectedPDF);

    return (
        <>
            <select className='mx-2 rounded' id="pdfSelector" onChange={handleSelectChange} value={selectedPDF}>
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
