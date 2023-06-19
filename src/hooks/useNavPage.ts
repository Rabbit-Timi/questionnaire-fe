import { useEffect } from 'react'
import useGetUserInfo from './useGetUserInfo'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
  idNoNeedUserInfo,
  isLoginOrRegister,
} from '../router'

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    if (waitingUserData) return
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }
    if (idNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, username, pathname])
}

export default useNavPage
