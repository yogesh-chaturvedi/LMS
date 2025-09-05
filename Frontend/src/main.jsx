import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContext.jsx'
import CoursesContextProvider from './context/CoursesContext.jsx'
import UserContextProvider from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CoursesContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </CoursesContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
