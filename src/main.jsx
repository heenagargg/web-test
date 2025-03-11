import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Website from './components/Website.jsx'
import CardsBoard from './CardsBoard.jsx'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <Routes>
         <Route path="/website-builder" element={<App/>}></Route>
         <Route path="/website-builder/site-structure" element={<Website/>}/>
      </Routes>
   </BrowserRouter>
)
