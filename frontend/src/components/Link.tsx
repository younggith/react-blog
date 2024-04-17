import type {LinkProps as RRLinkProps} from 'react-router-dom'
import {Link as RRLink, useResolvedPath, useMatch} from 'react-router-dom'

export type LinkProps = RRLinkProps & {}

export const Link = ({className: _className, to, ...props}: LinkProps) => {
  const resolved = useResolvedPath(to)
  console.log('resolved', resolved)
  const match = useMatch({path: resolved.pathname, end: true})
  console.log('match', match)
  const className = [_className, match ? 'btn-active' : ''].join(' ')
  return <RRLink {...props} to={to} className={className} />
}
