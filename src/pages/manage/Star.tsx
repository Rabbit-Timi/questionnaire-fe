import React, { FC } from 'react'
import { useTitle } from 'ahooks'

const Star: FC = () => {
  useTitle('星标问卷')

  return (
    <>
      <p>Star</p>
    </>
  )
}

export default Star
