import {Route, Routes} from 'react-router-dom'
import LandingPage from '../views/LandingPage'
import Layout from '../layout/Layout'
import Page404 from './Page404'
import Login from '../views/Login'
import SignUp from '../views/SignUp'

const RoutesSetup = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/logout" element={<Logout />} /> */}
    </Routes>
  )
}

export default RoutesSetup
