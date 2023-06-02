import React, { FC, useEffect, useState } from 'react'
import { useRequest, useTitle } from 'ahooks'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'
import { useSearchParams } from 'react-router-dom'
import { Empty, Spin, Typography } from 'antd'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'

const { Title } = Typography

const List: FC = () => {
  useTitle('我的问卷')
  // const [searchParams] = useSearchParams()
  // console.log('keyword', searchParams.get('keyword'))

  const { loading, error, data = {} } = useLoadQuestionListData()
  const { list = [], total = 0 } = data

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>loadMore...</div>
    </>
  )
}

export default List
