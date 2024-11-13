import { Chat } from "./components/Chat.jsx"
import { SelectPdf } from "./components/SelectPdf.jsx"

function App() {

  return (
    <main className='bg-neutral-900 w-full h-screen flex flex-col overflow-hidden'>
      <h1 className='text-neutral-400 text-2xl font-bold pl-3 pt-3'>ChatBot</h1>

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
