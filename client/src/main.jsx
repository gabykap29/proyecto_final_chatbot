import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { PageContextProvider } from './context/AppContext.jsx'
import "./App.css"

ReactDOM.createRoot(document.getElementById('root')).render(
    <PageContextProvider>
        <App />
    </PageContextProvider >
)
