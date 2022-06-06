import { useEffect, useState } from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {

  const [clientes, setClientes] = useState([])
  useEffect(() => {
    const obtenerClienteApi = async () => {
      try {
        //consulta a la API, cuando es petición del tipo GET no es necesario enviar un objeto por el fetch
        const url = import.meta.env.VITE_API_URL
        const resupuesta = await fetch(url)
        //usamos el resultado para setClientes
        const resultado = await resupuesta.json()
        setClientes(resultado)

      } catch (error) {
        console.log(error)
      }
    }

    obtenerClienteApi()
  }, [])

  const handleEliminar = async (id) =>{
    //confirmación del cliente a eliminar
    const confirmar = confirm('¿Desea eliminar este cliente?')
    if(confirmar){
      try {
        //cuando es delete, solo debemos pasar el method: "DELETE"
        const url = `${import.meta.env.VITE_API_URL}/${id}`
        const respuesta = await fetch(url, {
          method: 'DELETE'
        })
        //cuando no necesitamos el resultado solo damos await respuesta.json()
        await respuesta.json()

        //actualizamos el db.json pero no el estado. Por lo tanto hacemos un filter y usamos el setClientes
        const arrayClientes = clientes.filter(cliente => cliente.id !== id)
        setClientes(arrayClientes)
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900 text-center'>Clientes</h1>
      <p className='mt-3 text-center' >Administra tus clientes</p>

      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-blue-800 text-white'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {
            clientes.map(cliente => (
              <Cliente 
                key={cliente.id}
                cliente={cliente}
                handleEliminar={handleEliminar}
              />
            ))
          }
        </tbody>

      </table>

    </>
  )
}

export default Inicio