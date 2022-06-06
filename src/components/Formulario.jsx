import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Error from './Error'
import Spinner from './Spinner'


const Formulario = ({ cliente, load }) => {

  const navigate = useNavigate()

  // Yup es validaciones que vienen bien con Formik, necesitamos crear el schema

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El nombre del cliente es requerido"),
    empresa: Yup.string()
      .required('El nombre de la empresa es requerido'),
    email: Yup.string()
      .email("Tiene que ser un email válido")
      .required('El email es obligatorio'),
    telefono: Yup.number()
      .integer("Número no válido")
      .positive("Número no válido")
      .typeError('El número no es válido')

  })
  const handleSubmit = async (valores) => {
    try {
      let respuesta
      if (cliente.id) {
        //editando un registro
        const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`
        respuesta = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(valores),
          headers: {
            "Content-type": "application/json"
          }
        })
      } else {
        //nuevo registro
        const url = import.meta.env.VITE_API_URL
        respuesta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(valores),
          headers: {
            "Content-type": "application/json"
          }
        })
      }

     await respuesta.json()
      navigate('/clientes')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    load ? <Spinner /> : (
      <div className='bg-white mt-10 py-10 px-5 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1
          className='text-gray-600 font-bold text-xl uppercase text-center'
        >{cliente?.nombre ? "Editar cliente" : "Agregar cliente"}</h1>

        <Formik
          initialValues={
            {
              nombre: cliente?.nombre ?? "",
              empresa: cliente?.empresa ?? "",
              email: cliente?.email ?? "",
              notas: cliente?.notas ?? "",
              telefono: cliente?.telefono ?? ""

            }}
          enableReinitialize={true}
          onSubmit={async (values, { resetForm }) => {
            await handleSubmit(values)
            resetForm()
          }}
          validationSchema={nuevoClienteSchema}
        >
          {
            ({ errors, touched }) => {

              return (
                <Form className='mt-10' >
                  <div className='mb-4'>
                    <label
                      className='text-gray-800'
                      htmlFor='nombre'
                    >Nombre:</label>
                    <Field
                      id="nombre"
                      type="text"
                      className="mt-2 block w-full p-3 bg-gray-50"
                      placeholder="Nombre del Cliente"
                      name="nombre"
                    />
                    {
                      errors.nombre && touched.nombre ?
                        <Error>{errors.nombre}</Error>
                        :
                        null
                    }
                  </div>

                  {/* separacion */}

                  <div className='mb-4'>
                    <label
                      className='text-gray-800'
                      htmlFor='empresa'
                    >Empresa:</label>
                    <Field
                      id="empresa"
                      type="text"
                      className="mt-2 block w-full p-3 bg-gray-50"
                      placeholder="Empresa del Cliente"
                      name="empresa"
                    />
                    {
                      errors.empresa && touched.empresa ?
                        <Error>{errors.empresa}</Error>
                        :
                        null
                    }
                  </div>
                  {/* separacion */}

                  <div className='mb-4'>
                    <label
                      className='text-gray-800'
                      htmlFor='email'
                    >Email:</label>
                    <Field
                      id="email"
                      type="email"
                      className="mt-2 block w-full p-3 bg-gray-50"
                      placeholder="Email del Cliente"
                      name="email"
                    />
                    {
                      errors.email && touched.email ?
                        <Error>{errors.email}</Error>
                        :
                        null
                    }
                  </div>

                  {/* separacion */}

                  <div className='mb-4'>
                    <label
                      className='text-gray-800'
                      htmlFor='telefono'
                    >Telefono:</label>
                    <Field
                      id="telefono"
                      type="tel"
                      className="mt-2 block w-full p-3 bg-gray-50"
                      placeholder="Telefono del Cliente"
                      name="telefono"
                    />
                    {
                      errors.telefono && touched.telefono ?
                        <Error>{errors.telefono}</Error>
                        :
                        null
                    }
                  </div>

                  {/* separacion */}

                  <div className='mb-4'>
                    <label
                      className='text-gray-800'
                      htmlFor='notas'
                    >Notas:</label>
                    <Field
                      as="textarea"
                      id="notas"
                      type="text"
                      className="mt-2 block w-full p-3 bg-gray-50 h-40"
                      placeholder="Notas del Clientes"
                      name="notas"
                    />
                  </div>

                  <input
                    type="submit"
                    value={cliente?.nombre ? "Editar cliente" : "Agregar cliente"}
                    className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                  />

                </Form>
              )
            }
          }

        </Formik>

      </div>
    )
  )
}
//ponemos por defecto los siguientes props para poder retulizar el codigo en editar y nuevo cliente
Formulario.defaultProps = {
  cliente: {},
  load: false
}

export default Formulario