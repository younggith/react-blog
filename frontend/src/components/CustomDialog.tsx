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

interface CustomDialogProps {
  title: string
  subTitle: string
  open: boolean
  toggleOpen: () => void
  onAccept: () => void
}

const CustomDialog = (props: CustomDialogProps) => {
  const {open, toggleOpen, onAccept, title, subTitle} = props
  return (
    <Dialog open={open} onClose={toggleOpen} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">{title}</Typography>
      </DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={toggleOpen}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography variant="subtitle1">{subTitle}</Typography>
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
  )
}

export default CustomDialog
