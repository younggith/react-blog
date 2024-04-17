import {Link} from '../components/Link'
import {useNavigate} from 'react-router-dom'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  IconButton
} from '@mui/material'
import {Close} from '@mui/icons-material'
import {useToggle} from '../hooks/useToggle'
import {useAuth} from '../contexts/AuthContext'
import {useCallback} from 'react'

const NavigationBar = () => {
  const [open, toggleOpen] = useToggle(false)
  const navigate = useNavigate()
  const {logout} = useAuth()
  const onAccept = useCallback(() => {
    logout(() => {
      toggleOpen()
      navigate('/logout')
    })
  }, [navigate, toggleOpen, logout])
  return (
    <>
      <div className="flex p-2 justify-end">
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
      <div className="flex p-2 navbar w-4/5 mx-auto">
        <Link to="/" className="btn btn-link no-underline">
          Home
        </Link>
        <Link to="/board" className="btn btn-link ml-4 no-underline">
          Board
        </Link>
      </div>
      <Dialog open={open} onClose={toggleOpen} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6">로그아웃 확인</Typography>
        </DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton onClick={toggleOpen}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent>
          <Typography variant="subtitle1">정말 로그아웃하시겠습니까?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={toggleOpen} color="error">
            아니오
          </Button>
          <Button variant="contained" onClick={onAccept}>
            예
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NavigationBar
