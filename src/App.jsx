import {BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import EditarClientes from "./pages/EditarClientes"
import Home from "./pages/Home"
import Inicio from "./pages/Inicio"
import NuevoClientes from "./pages/NuevoClientes"
import VerCliente from './pages/VerCliente'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/*" element={<Home />}/>
        <Route path="/clientes" element={<Layout/>}>
            <Route index element={<Inicio />} />
            <Route path="nuevo" element={<NuevoClientes/>} />
            <Route path="editar/:id" element={<EditarClientes/>} />
            <Route path=":id" element={<VerCliente/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
