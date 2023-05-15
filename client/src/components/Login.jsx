import { useState, useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const LOGIN_URL = 'http://localhost:4000/users/login'

export default () => {
  const { setAuth } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(LOGIN_URL, { username, password })
      const accessToken = res?.data?.token
      const userId = res?.data?.userId

      setAuth({ username, userId, accessToken })
      navigate('/tasks')
    } catch (err) {
      if (!err?.response) {
        console.log('No Server Response')
      } else if (err.res?.status === 400) {
        console.log('Missing username or password')
      } else if (err.res?.status === 401) {
        console.log('Unauthorized')
      } else {
        console.log('Login Failed')
      }
    }
  }

  return <div className="h-screen w-screen flex justify-center items-center">
    <form
      className="w-80 p-5 border border-gray-500 rounded-md"
      onSubmit={onSubmit}
    >
      <h1 className="text-3xl text-center w-full font-bold mb-3">Inicio</h1>
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
        <input
          type="username"
          id="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Digita tu usuario..."
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contrasena</label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Digita tu contrasena..."
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        No tienes cuenta? Click <Link className="text-blue-700 font-bold" to="/signup">Aqui</Link>
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Entrar</button>
    </form>
  </div>
}

