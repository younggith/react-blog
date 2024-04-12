import {Route, Routes} from 'react-router-dom'
import LandingPage from '../views/LandingPage'
import Layout from '../layout/Layout'

const RoutesSetup = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
      </Route>
    </Routes>
  )
}

export default RoutesSetup
