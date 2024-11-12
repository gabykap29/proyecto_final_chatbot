import { useRef } from 'react'
import { Chat } from "./components/Chat.jsx"
import { FaArrowUp } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";

function App() {

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <main className='bg-neutral-900 w-full h-screen flex flex-col'>
      <h1 className='text-neutral-400 text-2xl font-bold'>ChatBot</h1>

      <Chat />


      <form className='flex flex-col items-center '>

        <div className="flex space-x-4 items-center justify-between bg-zinc-800 rounded-e-3xl rounded-s-3xl w-[50%] px-5 py-3">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }} 
          />

          <div className="flex items-center space-x-3 w-full">
            <i onClick={handleIconClick} className="cursor-pointer text-2xl text-neutral-200">
              <FaRegFilePdf />
            </i>
            <textarea
              rows={1}
              placeholder="Envia un mensaje al ChatBot"
              className="bg-zinc-800 text-white w-full rounded resize-none hover:resize-y"
            />
          </div>

          <button type="submit" className="rounded-full bg-neutral-200 p-3 hover:bg-neutral-500 transition-all duration-300">
            <FaArrowUp />
          </button>
        </div>

        <span className='text-neutral-500 animate-pulse'>El ChatBot puede cometer errores. Comprueba la información importante.</span>
      </form>
    </main>
  )
}

export default App
