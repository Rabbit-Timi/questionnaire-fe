import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

  return (
    <>
      <div>QuestionLayout header</div>
      <div>{!waitingUserData && <Outlet></Outlet>}</div>
      <div>QuestionLayout footer</div>
    </>
  )
}

export default QuestionLayout
