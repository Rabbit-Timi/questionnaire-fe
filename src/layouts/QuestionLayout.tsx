import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import { Spin } from 'antd'

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()

  // 用户没有登陆时跳转到登陆页
  useNavPage(waitingUserData)

  return (
    <div style={{ height: '100vh' }}>
      {waitingUserData ? (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Spin />
        </div>
      ) : (
        <Outlet></Outlet>
      )}
    </div>
  )
}

export default QuestionLayout
