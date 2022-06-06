import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"


const VerCliente = () => {
    const [cliente, setCliente] = useState({})
    const [load, setLoad] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        setLoad(!load)
        const obtenerClienteApi = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id} `
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
        load ? <Spinner /> : Object.keys(cliente).length === 0 ? <p>No Hay Resultados</p> : (
            <div>

                <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.nombre}</h1>
                <p className='mt-3 ' >Información del cliente</p>
                <p className="text-4xl text-gray-600 mt-10">
                    <span className="uppercase font-bold text-gray-800">Cliente: </span>
                    {cliente.nombre}
                </p>
                <p className="text-2xl text-gray-600 mt-4">
                    <span className="uppercase font-bold text-gray-800">Email: </span>
                    {cliente.email}
                </p>
                <p className="text-2xl text-gray-600 mt-4">
                    <span className="uppercase font-bold text-gray-800">Telefono: </span>
                    {cliente.telefono}
                </p>
                <p className="text-2xl text-gray-600 mt-4">
                    <span className="uppercase font-bold text-gray-800">Empresa: </span>
                    {cliente.empresa}
                </p>
                {cliente.notas && (
                    <p className="text-2xl text-gray-600 mt-4">
                        <span className="uppercase font-bold text-gray-800">Notas: </span>
                        {cliente.notas}
                    </p>
                )}



            </div>
        )
    )
}

export default VerCliente