import { useRef, useState } from 'react'
import { FaArrowUp } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";

export const Form = ({ setInput, input, handleSend }) => {

    const fileInputRef = useRef(null);

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    return (
        <form className='flex flex-col items-center py-3'>

            <div className="flex space-x-4 items-center justify-between bg-zinc-800 rounded-e-3xl rounded-s-3xl w-[50%] pl-3 pr-5 py-2">
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />

                <div className="flex items-center space-x-3 w-full">
                    <i title='Sube un PDF para hablar con el chat' onClick={handleIconClick} className="cursor-pointer text-2xl text-neutral-200">
                        <FaRegFilePdf />
                    </i>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={1}
                        placeholder="Envia un mensaje al ChatBot"
                        className="bg-zinc-800 text-white w-full rounded resize-none hover:resize-y"
                    />
                </div>

                <button title='Enviar pregunta' onClick={(e) => handleSend(e)} type="submit" className="rounded-full bg-neutral-200 p-3 hover:bg-neutral-500 transition-all duration-300">
                    <FaArrowUp />
                </button>
            </div>

            <span className='text-neutral-500 animate-pulse'>El ChatBot puede cometer errores. Comprueba la información importante.</span>
        </form>
    )
}
