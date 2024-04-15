import {Route, Routes} from 'react-router-dom'
import LandingPage from '../views/LandingPage'
import Layout from '../layout/Layout'
import Page404 from './Page404'

const RoutesSetup = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  )
}

export default RoutesSetup
