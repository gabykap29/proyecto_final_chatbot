import { createContext, useState, useEffect } from "react";

export const PageContext = createContext();

export const PageContextProvider = ({ children }) => {

    const [pdf, setPdf] = useState("")

    const [refetchState, setRefetchState] = useState(false)

    const updatePDF = (name) => {
        setPdf(name)
    }

    const refresh = () => {
        setRefetchState(!refetchState)
    }

    useEffect(() => {
        const selectedPDF = localStorage.getItem("selectedPDF");
        if (selectedPDF) {
            updatePDF(selectedPDF);
        }
    }, []);

    return (
        <PageContext.Provider value={{ pdf, updatePDF, refresh, refetchState }}>
            {children}
        </PageContext.Provider>
    );
};