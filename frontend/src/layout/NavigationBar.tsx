import {Link} from '../components/Link'
import {useNavigate} from 'react-router-dom'
import {useToggle} from '../hooks/useToggle'
import {useAuth} from '../contexts/AuthContext'
import {useCallback} from 'react'
import {useResponsive} from '../contexts/ResponsiveContext'
import CustomDialog from '../components/CustomDialog'

const NavigationBar = () => {
  const [open, toggleOpen] = useToggle(false)
  const navigate = useNavigate()
  const {logout} = useAuth()
  const size = useResponsive()
  const onAccept = useCallback(() => {
    logout(() => {
      toggleOpen()
      navigate('/logout')
    })
  }, [navigate, toggleOpen, logout])
  return (
    <>
      <div className="flex p-2 justify-end w-4/5 mx-auto">
        <Link to="/login" className="btn btn-sm btn-primary ">
          로그인
        </Link>
        {/* <Link to="/signup" className="ml-4 btn btn-sm btn-outline btn-primary">
          회원가입
        </Link> */}
        <Link to="#" className="ml-4 mr-4 btn btn-sm" onClick={toggleOpen}>
          로그아웃
        </Link>
      </div>
      <nav className="navbar bg-neutral text-neutral-conten p-2 shadow-lg w-4/5 mx-auto">
        <Link to="/" className="btn btn-ghost text-xl text-white">
          daisyUI
        </Link>
        {/* 큰 화면에서 표시할 메뉴 */}
        <div className="hidden lg:flex navbar-center space-x-4 ms-16">
          <Link to="/board" className="btn btn-link no-underline text-white">
            Board
          </Link>
          <Link to="/meet" className="btn btn-link no-underline text-white">
            Meet
          </Link>
        </div>

        {/* 작은 화면에서 햄버거 아이콘으로 메뉴를 표시 */}
        <div className="navbar-end w-full lg:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10">
              <li>
                <Link to="/" className="btn btn-link no-underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/board" className="btn btn-link no-underline">
                  Board
                </Link>
              </li>
              <li>
                <Link to="/meet" className="btn btn-link no-underline">
                  Meet
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <CustomDialog
        open={open}
        toggleOpen={toggleOpen}
        onAccept={onAccept}
        title="로그아웃 확인"
        subTitle="정말 로그아웃하시겠습니까?"
      />
    </>
  )
}

export default NavigationBar
