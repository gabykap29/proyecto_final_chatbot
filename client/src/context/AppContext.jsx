import { createContext, useState, useEffect } from "react";

export const PageContext = createContext();

export const PageContextProvider = ({ children }) => {

    const [pdf, setPdf] = useState("")

    const updatePDF = (name) => {
        setPdf(name)
    }

    useEffect(() => {
        const selectedPDF = localStorage.getItem("selectedPDF");
        if (selectedPDF) {
            updatePDF(selectedPDF);
        }
    }, []);

    return (
        <PageContext.Provider value={{ pdf, updatePDF }}>
            {children}
        </PageContext.Provider>
    );
};