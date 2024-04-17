import {Outlet, OutletProps} from 'react-router-dom'
import Footer from './Footer'
import NavigationBar from './NavigationBar'

const Layout = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
