import React, {Suspense} from 'react'
import {BrowserRouter} from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import RoutesSetup from './routes/RoutesSetup'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">1</div>
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <RoutesSetup />
      </Suspense>
    </BrowserRouter>
  )
}

export default App
