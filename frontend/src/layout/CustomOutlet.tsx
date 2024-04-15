import {Outlet, OutletProps} from 'react-router-dom'
import {useResponsive} from '../contexts/ResponsiveContext'

const CustomOutlet = () => {
  const size = useResponsive()
  return (
    <>
      <main>
        <section className="mt-4">size : {size}</section>
        <Outlet />
      </main>
    </>
  )
}

export default CustomOutlet
