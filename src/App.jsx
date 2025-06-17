import './App.css'
import LoginPage from './pages/LoginPage'
import ToDoPage from './pages/ToDoPage'

import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

function App() {

  const { isAuth } = useSelector(state => state.auth)

  return (
    <>
    <Routes>
      {!isAuth && (<Route path='*' element={<LoginPage/>}/>)}
      {!!isAuth && (<Route path='/' element={<ToDoPage/>}/>)}
      
    </Routes>
    </>
  )
}

export default App
