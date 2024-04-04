import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'

import{ createBrowserRouter, RouterProvider } from "react-router-dom"

import home from './routes/home.jsx'
import editar from './routes/editar.jsx'

const Home = home
const Edit = editar

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/editar/:id",
    element: <Edit />,
  },
  {
    path: "/editar",
    element: <Edit />,
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
