import React, {Suspense} from 'react'
import {BrowserRouter} from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import RoutesSetup from './routes/RoutesSetup'
import {ToastContainer} from 'react-toastify'
import {AuthProvider} from './contexts/AuthContext'
import {ResponsiveProvider} from './contexts/ResponsiveContext'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <span className="loading loading-spinner loading-lg"></span>
  </div>
)

function App() {
  return (
    <>
      <ResponsiveProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={loading}>
              <RoutesSetup />
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ResponsiveProvider>
      <ToastContainer pauseOnHover={true} pauseOnFocusLoss={false} />
    </>
  )
}

export default App
