import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Task from './components/Task'

import './App.css'

export default () => {
  return <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/tasks" element={<Task />} />
    <Route path="/signup" element={<SignUp />} />
  </Routes>
};
/*
*/
