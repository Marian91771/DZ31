import { configureStore } from '@reduxjs/toolkit'
import ToDoReducer from './ToDoSlice'
import AuthReducer from './authSlice'

const store = configureStore({
  reducer: {
    ToDos: ToDoReducer,
    auth: AuthReducer,
  },
})

export default store
