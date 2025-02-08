import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { JugadoresProvider } from "./context/JugadoresContext.jsx"
import { OrientadoresProvider } from "./context/OrientadoresContext.jsx"
import { EquiposProvider } from './context/equiposContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <JugadoresProvider>
      <OrientadoresProvider>
        <EquiposProvider>
          <App />
        </EquiposProvider>
      </OrientadoresProvider>
    </JugadoresProvider>

  </StrictMode>,
)
