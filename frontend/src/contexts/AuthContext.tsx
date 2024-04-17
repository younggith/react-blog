import type {PropsWithChildren} from 'react'
import {createContext, useContext, useState, useCallback} from 'react'

interface LoggedUser {
  email: string
  password: string
}
type Callback = () => void

interface ContextType {
  loggedUser?: LoggedUser
  signup: (email: string, password: string, callback?: Callback) => void
  login: (email: string, passwrd: string, callback?: Callback) => void
  logout: (callback?: Callback) => void
}

export const AuthContext = createContext<ContextType>({
  signup: (email: string, password: string, callback?: Callback) => {},
  login: (email: string, password: string, callback?: Callback) => {},
  logout: (callback?: Callback) => {}
})

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | undefined>(undefined)
  const signup = useCallback((email: string, password: string, callback?: Callback) => {
    setLoggedUser(notUsed => ({email, password}))
    callback && callback()
  }, [])
  const login = useCallback((email: string, password: string, callback?: Callback) => {
    setLoggedUser(notUsed => ({email, password}))
    callback && callback()
  }, [])
  const logout = useCallback((callback?: Callback) => {
    setLoggedUser(undefined)
    callback && callback()
  }, [])

  const value = {
    loggedUser,
    signup,
    login,
    logout
  }
  return <AuthContext.Provider value={value} children={children} />
}

export const useAuth = () => {
  return useContext(AuthContext)
}
