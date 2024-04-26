import {useState} from 'react'
import {
  Modal,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tabs,
  Tab,
  Button,
  Backdrop
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import {styled} from '@mui/system'
import zIndex from '@mui/material/styles/zIndex'

const CustomCheckbox = styled(Backdrop, {
  name: 'MuiModal',
  slot: 'Backdrop',
  overridesResolver: (props, styles) => {
    return styles.backdrop
  }
})({
  zIndex: -1
})

interface CustomModalProps {
  open: boolean
  handleClose: () => void
}

const CustomModal: React.FC<CustomModalProps> = ({open, handleClose}) => {
  const [value, setValue] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      hideBackdrop
      //   closeAfterTransition
      disableEscapeKeyDown
      slots={{backdrop: Backdrop}}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(255, 255, 255, 0)',
            zIndex: '-1'
          }
        }
      }}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          p: 4,
          width: 400
        }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}} id="modal-title">
              Modal Title
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab label="모임 소개" />
          <Tab label="모임 반경" />
        </Tabs>
        <Box sx={{p: 3}}>
          <TabPanel value={value} index={0}>
            <Typography variant="h6">모임 소개</Typography>
            <Typography>모임 소개 텍스트...</Typography>
            <Button variant="contained" onClick={handleClose} sx={{mt: 2}}>
              입장하기
            </Button>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography variant="h6">모임 반경</Typography>
            <Typography>모임 반경 정보...</Typography>
          </TabPanel>
          <Button variant="contained" onClick={handleClose} sx={{mt: 2, float: 'right'}}>
            확인
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

interface TabPanelProps {
  children?: React.ReactNode
  value: number
  index: number
}

const TabPanel: React.FC<TabPanelProps> = ({children, value, index}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tabpanel-${index}`}>
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export default CustomModal
