import {Route, Routes} from 'react-router-dom'
import LandingPage from '../views/LandingPage'
import Layout from '../layout/Layout'
import Page404 from './Page404'
import Login from '../views/Login'
import SignUp from '../views/SignUp'
import RequireAuth from '../components/RequireAuth'
import FindEmailAndPassword from '../views/FindEmailAndPassword'
import MeetList from '../views/MeetList'
import PrivateRoute from '../components/RequireAuth'
import CustomModal from '../components/CustomModal'

const RoutesSetup = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/board"
          element={
            <RequireAuth>
              <CustomModal open={true} handleClose={() => true} />
            </RequireAuth>
          }
        />
        <Route path="/meet" element={<MeetList />} />
        <Route path="/find/:path" element={<FindEmailAndPassword />} />
      </Route>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/logout" element={<Logout />} /> */}
    </Routes>
  )
}

export default RoutesSetup
