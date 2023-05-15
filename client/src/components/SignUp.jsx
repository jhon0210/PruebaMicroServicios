import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SIGNUP_URL = 'http://localhost:4000/users/signup'

export default () => {
  const navigate = useNavigate()
  const [username, setUsename] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const pwdsAreEqual = password1.trim() === password2.trim()

    if (!pwdsAreEqual) {
      return false;
    }

    await axios.post(SIGNUP_URL, { username, password: password1 })
    navigate('/')
  }

  return <div className="h-screen w-screen flex justify-center items-center">
    <form
      className="w-80 p-5 border border-gray-500 rounded-md"
      onSubmit={onSubmit}
    >
      <h1
        className="text-3xl text-center w-full font-bold mb-3">Registro</h1>
      <div className="mb-6">
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          id="username"
          placeholder="Digita tu usuario..."
          value={username}
          onChange={e => setUsename(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contrase&ntilde;a</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="password"
          id="password1"
          placeholder="Digita tu contraseña..."
          value={password1}
          onChange={e => setPassword1(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm your password</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="password"
          id="password2"
          placeholder="Confirma tu contraseña..."
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        Tienes cuenta? Click <Link className="text-blue-700 font-bold" to="/">Aqui</Link>
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrarse</button>
    </form>
  </div>
}


