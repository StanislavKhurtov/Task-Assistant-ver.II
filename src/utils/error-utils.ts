// generic function
import { ResponseType } from '@/api/todolist-api'
import { appAction } from '@/app/app-reducer'
import { Dispatch } from 'redux'

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  data.messages.length
    ? dispatch(appAction.setError({ error: data.messages[0] }))
    : dispatch(appAction.setError({ error: 'Some error occurred' }))

  dispatch(appAction.setStatus({ status: 'failed' }))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(appAction.setError({ error: error.message }))
  dispatch(appAction.setStatus({ status: 'failed' }))
}
