import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { useParams } from 'react-router-dom'

const Stat: FC = () => {
  const { id = '' } = useParams()

  const { loading } = useLoadQuestionData()

  return (
    <div>
      <p>Stat {id}</p>
      {/* {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>} */}
    </div>
  )
}

export default Stat
