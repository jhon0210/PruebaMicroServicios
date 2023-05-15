import { useEffect, useState } from 'react'
import axios from 'axios'

const QUERY_URL = 'http://localhost:4002/users'
const TASKS_URL = 'http://localhost:4001/users'

export default ({ userId, tasks, setTasks }) => {

  const fetchTasks = async () => {
    const res = await axios.get(`${QUERY_URL}/${userId}/tasks`)

    console.log(res.data)
    setTasks(res.data.tasks)
  }

  const handleDelete = async e => {
    const taskId = e.target.value
    console.log(taskId)

    const res = await axios.delete(`${TASKS_URL}/tasks/${taskId}`)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => console.log(tasks), [tasks])

  return <div className="px-3">
    <div className="relative overflow-x-auto overflow-y-auto">
      {!tasks ?
        <h2 className="text-3xl text-gray-400 font-bold w-full text-center">Vacio! :)</h2>
        :
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3 text-center">
                #
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(tasks)?.map(key => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={tasks[key].id}
              >
                <td scope="row" className="px-2 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {parseInt(key) + 1}
                </td>
                <td className="px-6 py-4">
                  {tasks[key].title}
                </td>
                <td className="px-6 py-4 flex justify-center space-x-2">
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-blue-600 darak:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                  >Editar</button>
                  <button
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    type="submit"
                    value={tasks[key].id._id}
                    onClick={e => handleDelete(e)}
                  >Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  </div>
}
