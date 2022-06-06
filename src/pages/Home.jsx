import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  return (
    <div className='bg-blue-700 min-h-screen pt-20 '>

        <div className='bg-white p-5 text-center w-2/4 mx-auto rounded-lg'>
            <h1 className='text-3xl font-bold my-5'>Bienvenido! CRM - REACT</h1>
            <a href="https://github.com/ignacioM3" className='block text-xl font-bold text-indigo-500 hover:text-indigo-700' target="__blank">IgnacioM3 <i class="fa-brands fa-github"></i></a>
            <button 
            type='button' 
            className='py-3 px-8 sm:px-10 my-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg'
            onClick={() => navigate("/clientes") }
            >
                Inicio
            </button>
        </div>
    </div>
  )
}

export default Home