import Footer from './Footer'
import {ResponsiveProvider, useResponsive} from '../contexts/ResponsiveContext'
import CustomOutlet from './CustomOutlet'

const Layout = () => {
  return (
    <>
      <ResponsiveProvider>
        <CustomOutlet />
        <Footer />
      </ResponsiveProvider>
    </>
  )
}

export default Layout
