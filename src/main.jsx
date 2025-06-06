import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit'

import ToDoReducer from './store/ToDoSlice.js'

const store = configureStore({
  reducer: {
    ToDos: ToDoReducer,
  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
