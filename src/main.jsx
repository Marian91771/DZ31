import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit'

import ToDoReducer from './store/ToDoSlice.js'
import AuthReducer from './store/authSlice.js'
import { BrowserRouter } from 'react-router-dom'

const store = configureStore({
  reducer: {
    ToDos: ToDoReducer,
    auth: AuthReducer,
  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
