import { Chat } from "./components/Chat.jsx"
import { SelectPdf } from "./components/SelectPdf.jsx"
import { useContext } from "react"
import { PageContext } from "./context/AppContext.jsx"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const { pdf } = useContext(PageContext)

  return (
    <main className='bg-neutral-900 w-full h-screen flex flex-col overflow-hidden'>

      <ToastContainer />

      <div className="pt-3 pl-3">
        <h1 className='text-neutral-400 text-2xl font-bold'>ChatBot</h1>
        <h2 className="text-neutral-500 text-sm">PDF: {pdf}</h2>
      </div>

      <div className='flex justify-center'>
        <SelectPdf />
      </div>

      <div className='py-5 overflow-y-auto h-full'>
        <Chat />
      </div>

    </main>
  )
}

export default App
