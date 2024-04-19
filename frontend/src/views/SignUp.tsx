import {useState, useCallback, ChangeEvent} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'
import {useForm, SubmitHandler} from 'react-hook-form'

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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input
              type="email"
              className="input input-bordered w-full"
              {...register('email', {required: '이메일은 필수입니다.'})}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
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
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* 비밀번호 확인 입력 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호 확인
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              {...register('passwordConfirmation', {
                required: '비밀번호 확인은 필수입니다.',
                validate: value =>
                  value === watch('password') || '비밀번호가 일치하지 않습니다.'
              })}
            />
            {errors.passwordConfirmation && (
              <span className="text-red-500 text-sm">
                {errors.passwordConfirmation.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register('name', {required: '이름은 필수입니다.'})}
            />
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              휴대폰 번호
            </label>
            <input
              type="tel"
              className="input input-bordered w-full"
              {...register('phoneNumber', {
                required: '휴대폰 번호는 필수입니다.',
                pattern: {
                  value: /^\d{11}$/,
                  message: '전화번호는 11자리의 숫자여야 합니다.'
                }
              })}
              onChange={onChangePhoneNumberHandler}
            />
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
