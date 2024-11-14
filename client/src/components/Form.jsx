import { FaSquare, FaArrowUp } from "react-icons/fa";
import { LoadPDF } from "./LoadPDF";

export const Form = ({ setInput, input, handleSend, loading }) => {

    const handleInputChange = (e) => {
        setInput(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <form className='flex flex-col items-center py-3'>

            <div className="flex space-x-4 items-center justify-between bg-zinc-800 rounded-e-3xl rounded-s-3xl w-[50%] pl-3 pr-5 py-2">

                <div className="flex items-center space-x-3 w-full">

                    <LoadPDF />

                    <textarea
                        value={input}
                        onChange={handleInputChange}
                        rows={1}
                        placeholder="Envia un mensaje al ChatBot"
                        className="bg-zinc-800 text-white w-full rounded resize-none"
                    />
                </div>

                <button disabled={loading} title={loading ? "Espere..." : "Enviar pregunta"} onClick={(e) => handleSend(e)} type="submit" className={`${!loading ? "bg-neutral-200" : "bg-neutral-500"} rounded-full p-3 hover:bg-neutral-500 transition-all duration-300`}>
                    {loading ? <FaSquare /> : <FaArrowUp />}
                </button>
            </div>

            <span className='text-neutral-500 animate-pulse'>El ChatBot puede cometer errores. Comprueba la información importante.</span>
        </form >
    )
}
