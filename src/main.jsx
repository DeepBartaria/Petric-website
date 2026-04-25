import { StrictMode } from 'react'
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DialogProvider } from './context/DialogContext.jsx'
import GlobalDialog from './components/DialogBox.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DialogProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
        <GlobalDialog />
      </BrowserRouter>
    </DialogProvider>
  </StrictMode>,
)
