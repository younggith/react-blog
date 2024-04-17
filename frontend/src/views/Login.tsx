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
        <div className="mb-4">
          <input
            type="email"
            id="email"
            value={email}
            onChange={changed('email')}
            className="input input-bordered input-primary w-full"
            placeholder="이메일"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            value={password}
            onChange={changed('password')}
            className="input input-bordered input-primary w-full"
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
