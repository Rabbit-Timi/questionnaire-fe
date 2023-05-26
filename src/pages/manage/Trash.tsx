import { useTitle } from 'ahooks'
import React, { FC } from 'react'

const Trash: FC = () => {
  useTitle('回收站')

  return (
    <>
      <p>Trash</p>
    </>
  )
}

export default Trash
