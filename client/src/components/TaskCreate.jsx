import { useState } from 'react'
import axios from 'axios'

const TASKS_URL = 'http://localhost:4001/users'
const QUERY_URL = 'http://localhost:4002/users'

export default ({ userId, setTasks }) => {
  const [title, setTitle] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()

    await axios.post(`${TASKS_URL}/${userId}/tasks`, { title })
    const res = await axios.get(`${QUERY_URL}/${userId}/tasks`)

    setTitle('')
    setTasks(res.data.tasks)
  };

  return <div className="pt-5 px-3">
    <h2 className="text-3xl font-bold mb-5">Agregar Tarea</h2>
    <form
      className="flex space-x-2"
      onSubmit={onSubmit}
    >
      <div className="flex-1">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Digita el nombre de la tarea..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="submit"
      >Agregar</button>
    </form>
  </div>
}
