import {useEffect, PropsWithChildren} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

const RequireAuth = ({children}: PropsWithChildren) => {
  const {loggedUser} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedUser) {
      navigate('/login')
    }
  }, [loggedUser, navigate])

  return <>{children}</>
}

export default RequireAuth
