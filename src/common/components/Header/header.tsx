import { selectStatus } from '@/app/app.selectors'
import { RequestStatusType } from '@/app/appSlice'
import { useAppSelector } from '@/app/store'
import { LogOutIcon } from '@/assets'
import { Linear } from '@/common/components/Preloader'
import { useActions } from '@/common/hooks/useActions'
import { selectIsLoginIn } from '@/features/auth/model/auth.selectors'
import { authThunk } from '@/features/auth/model/authSlice'

export const Header = () => {
  const status = useAppSelector<RequestStatusType>(selectStatus)
  const isLoggidIn = useAppSelector<boolean>(selectIsLoginIn)
  const { logOut } = useActions(authThunk)
  const logout = () => {
    logOut()
  }

  return (
    <>
      {status === 'loading' && <Linear className={'preloader'} />}
      <div className={'header'}>
        <div className={'header__container'}>
          <div className={'header__logo'}>TasksAssistant</div>
          {isLoggidIn ? (
            <button className={'header__btn'} onClick={logout}>
              Log Out
              <LogOutIcon className={'header__icon'} />
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}
