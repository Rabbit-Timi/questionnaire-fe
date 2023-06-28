import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { Button, Result, Spin } from 'antd'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import styles from './index.module.scss'
import StatHeader from './StatHeader'

const Stat: FC = () => {
  const nav = useNavigate()
  const { loading } = useLoadQuestionData()
  const { title, isPublished } = useGetPageInfo()

  // 修改标题
  useTitle(`问卷统计 - ${title}`)

  const LoadingElem = (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin />
    </div>
  )

  function genContentElem() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: '1' }}>
          <Result
            status="warning"
            title="该页尚未发布"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  nav(-1)
                }}
              >
                返回
              </Button>
            }
          />
        </div>
      )
    } else {
      return (
        <>
          <div className={styles.left}>left</div>
          <div className={styles.main}>main</div>
          <div className={styles.right}>right</div>
        </>
      )
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <StatHeader />
      </div>
      <div className={styles['content-wrapper']}>
        {loading && LoadingElem}
        <div className={styles.content}>{!loading && genContentElem()}</div>
      </div>
    </div>
  )
}

export default Stat
