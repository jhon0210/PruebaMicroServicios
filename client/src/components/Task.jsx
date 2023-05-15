import { useContext, useState } from 'react'
import AuthContext from '../context/AuthProvider'

import TaskCreate from './TaskCreate'
import TaskList from './TaskList'

export default () => {
  const [tasks, setTasks] = useState([])
  const { auth, setAuth } = useContext(AuthContext)
  const { userId } = auth

  return <>
    <TaskCreate
      userId={userId}
      setTasks={setTasks}
    />
    <hr className="border border-t-gray-300 mx-3 my-5" />
    <h1 className="text-3xl font-bold px-3 pb-3">Tareas</h1>
    <TaskList
      userId={userId}
      tasks={tasks}
      setTasks={setTasks}
    />
  </>
}

