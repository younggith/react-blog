import {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import {FormControlLabel, Checkbox} from '@mui/material'
import {styled} from '@mui/system'
import {useAuth} from '../contexts/AuthContext'

const CustomCheckbox = styled(Checkbox)({
  '&.Mui-checked': {
    color: '#3F00E7'
  }
})

type LoginFormType = Record<'email' | 'password', string>
const initalFormState = {email: '', password: ''}

const Login = () => {
  const [{email, password}, setForm] = useState<LoginFormType>(initalFormState)
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const navigate = useNavigate()
  const {login} = useAuth()

  const changed = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(obj => ({...obj, [key]: e.target.value}))
    },
    []
  )

  const loginAccount = useCallback(() => {
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true')
    }
    login(email, password, () => navigate('/'))
  }, [rememberMe])

  useEffect(() => {}, [])

  //   const handleSubmit = (event: FormEvent) => {
  //     event.preventDefault()
  //     // 로그인 처리 로직을 여기에 추가하세요.
  //     console.log('이메일:', email)
  //     console.log('비밀번호:', password)
  //   }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
          {/* 로고를 클릭하면 "/"로 이동 */}
          <Link to="/">
            <img src={''} alt="로고" className="h-12 w-auto" />
          </Link>
        </div>
        {/* <form onSubmit={handleSubmit}> */}
        <div className="mb-4 input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            id="email"
            value={email}
            onChange={changed('email')}
            className="grow"
            placeholder="이메일"
            required
          />
        </div>
        <div className="mb-4 input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            id="password"
            value={password}
            onChange={changed('password')}
            className="grow"
            placeholder="비밀번호"
            required
          />
        </div>
        <div className="mb-4">
          <FormControlLabel
            control={
              <CustomCheckbox
                icon={<CheckCircleOutlineIcon />}
                checkedIcon={<CheckCircleOutlineIcon />}
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
              />
            }
            label="로그인 상태 유지"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full" onClick={loginAccount}>
          로그인
        </button>
        {/* </form> */}
        <div className="mt-4 text-center">
          <Link to="/find/email" className="btn btn-ghost">
            이메일 찾기
          </Link>
          <Link to="/find/password" className="btn btn-ghost">
            비밀번호 찾기
          </Link>
          <Link to="/signup" className="btn btn-outline btn-accent">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
