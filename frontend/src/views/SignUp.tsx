import {useState, useCallback, ChangeEvent} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'
import {useForm, SubmitHandler} from 'react-hook-form'
import PhoneIcon from '@mui/icons-material/Phone'

interface SignUpFormData {
  email: string
  password: string
  passwordConfirmation: string
  name: string
  gender: '남자' | '여자'
  birthDate: string
  phoneNumber: string
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm<SignUpFormData>()

  const onChangePhoneNumberHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    value = value.replace(/-/g, '')
    e.target.value = value
  }

  const onSubmit: SubmitHandler<SignUpFormData> = data => {
    // 회원가입 데이터 처리 로직
    const formattedBirthDate = data.birthDate.replace(/-/g, '')
    data.birthDate = formattedBirthDate
    if (!data.phoneNumber.includes('-')) {
      // 전화번호의 형식에 따라 하이픈을 추가합니다.
      const telCode = data.phoneNumber.slice(0, 3)
      const firstPart = data.phoneNumber.slice(3, 7)
      const secondPart = data.phoneNumber.slice(7, 11)
      data.phoneNumber = `${telCode}-${firstPart}-${secondPart}`
    }
    console.log(data)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 이메일 입력 */}
          <div className="input input-bordered flex items-center gap-2">
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
              className="grow"
              placeholder="이메일"
              {...register('email', {required: '이메일은 필수입니다.'})}
            />
          </div>
          <div className="mb-4">
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div className="input input-bordered flex items-center gap-2">
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
              className="grow"
              placeholder="비밀번호"
              {...register('password', {
                required: '비밀번호는 필수입니다.',
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&_])[A-Za-z\d$@$!%*#?&_]{8,}$/,
                  message:
                    '비밀번호는 영문, 숫자, 특수문자 포함 8자리 이상 등록하여야 합니다'
                }
              })}
            />
          </div>
          <div className="mb-4">
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* 비밀번호 확인 입력 */}
          <div className="input input-bordered flex items-center gap-2">
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
              className="grow"
              placeholder="비밀번호 확인"
              {...register('passwordConfirmation', {
                required: '비밀번호 확인은 필수입니다.',
                validate: value =>
                  value === watch('password') || '비밀번호가 일치하지 않습니다.'
              })}
            />
          </div>
          <div className="mb-4">
            {errors.passwordConfirmation && (
              <span className="text-red-500 text-sm">
                {errors.passwordConfirmation.message}
              </span>
            )}
          </div>

          <div className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="이름"
              {...register('name', {required: '이름은 필수입니다.'})}
            />
          </div>
          <div className="mb-4">
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          {/* 성별 선택 */}
          <div className="flex justify-between mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1">성별</label>
            <div role="tablist" className="tabs tabs-bordered">
              <input
                type="radio"
                className="tab"
                role="tab"
                aria-label="남자"
                {...register('gender')}
                value="남자"
                defaultChecked
              />
              <input
                type="radio"
                className="tab"
                role="tab"
                aria-label="여자"
                {...register('gender')}
                value="여자"
              />
            </div>
          </div>

          {/* 생년월일 입력 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              생년월일
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register('birthDate', {required: '생년월일은 필수입니다.'})}
            />
            {errors.birthDate && (
              <span className="text-red-500 text-sm">{errors.birthDate.message}</span>
            )}
          </div>

          {/* 휴대폰 번호 입력 */}
          <div className="input input-bordered flex items-center gap-2">
            <PhoneIcon />
            <input
              type="tel"
              className="grow"
              placeholder="휴대폰번호"
              {...register('phoneNumber', {
                required: '휴대폰 번호는 필수입니다.',
                pattern: {
                  value: /^\d{11}$/,
                  message: '휴대폰번호는 11자리의 숫자여야 합니다.'
                }
              })}
              onChange={onChangePhoneNumberHandler}
            />
          </div>
          <div className="mb-4">
            {errors.phoneNumber && (
              <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>
            )}
          </div>

          {/* 제출 버튼 */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-full">
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
