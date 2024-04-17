import {createContext, useContext} from 'react'
import type {PropsWithChildren} from 'react'
import {useWindowResize} from '../hooks/useWindowResize'

interface ContextType {
  size: string
}
const defaultContextValue: ContextType = {
  size: ''
}
export const ResponsiveContext = createContext<ContextType>(defaultContextValue)

export const ResponsiveProvider = ({children, ...props}: PropsWithChildren) => {
  const [width] = useWindowResize()
  const size =
    width < 640
      ? 'sm'
      : width < 768
      ? 'md'
      : width < 1024
      ? 'lg'
      : width < 1280
      ? 'xl'
      : '2xl'
  const value = {
    size
  }
  return <ResponsiveContext.Provider value={value} children={children} />
}

export const useResponsive = () => {
  const {size} = useContext(ResponsiveContext)
  return size
}
