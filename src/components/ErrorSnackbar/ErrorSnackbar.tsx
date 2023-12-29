import React from 'react'

import { appAction } from '@/app/app-reducer'
import { useAppSelector } from '@/app/store'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant={'filled'} {...props} />
})

export function ErrorSnackbar() {
  const error = useAppSelector<null | string>(state => state.app.error)
  const dispatch = useAppDispatch()
  const handleClose = (_event?: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(appAction.setError({ error: null }))
  }

  return (
    <Snackbar autoHideDuration={5000} onClose={handleClose} open={!!error}>
      <Alert onClose={handleClose} severity={'error'} sx={{ width: '100%' }}>
        {error} 😠
      </Alert>
    </Snackbar>
  )
}
