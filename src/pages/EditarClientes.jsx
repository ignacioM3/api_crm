import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Formulario from '../components/Formulario'

const EditarClientes = () => {

  const [cliente, setCliente] = useState({})
  const [load, setLoad] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    setLoad(!load)
    const obtenerClienteApi = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id} `
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setCliente(resultado)
      } catch (error) {
        console.log(error)
      }
      setLoad(false)
    }
    obtenerClienteApi()
  }, [])


  return (
    <>
      <h1 className='font-black text-4xl text-blue-900 text-center'>Editar Cliente</h1>
      <p className='mt-3 text-center ' >Utiliza este formulario para editar los datos del cliente</p>

      {
        cliente?.nombre ? (
          <Formulario
            cliente={cliente}
            load={load}
          />
        ) : <p>Cliente ID no válido</p>
      }

    </>
  )
}

export default EditarClientes