import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Details from './pages/Details.jsx'
import './styles.css' // ✅ CSS import करो (तुम्हारी बनाई हुई CSS फाइल)

// ✅ Router config
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'movie/:id', element: <Details /> }
    ]
  }
])

// ✅ Render app
const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
