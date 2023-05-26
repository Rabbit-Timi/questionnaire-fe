import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import QuestionCard from '../../components/QuestionCard'
import styles from './List.module.scss'
import { useSearchParams } from 'react-router-dom'

const rawQuestionList = [
  {
    _id: 'q1',
    title: 'wenjuan1',
    isPublished: false,
    isStart: false,
    answerCount: 5,
    createAt: '3月10日 12:30',
  },
  {
    _id: 'q2',
    title: 'wenjuan2',
    isPublished: true,
    isStart: true,
    answerCount: 20,
    createAt: '3月11日 12:30',
  },
  {
    _id: 'q3',
    title: 'wenjuan3',
    isPublished: false,
    isStart: false,
    answerCount: 15,
    createAt: '3月2日 12:30',
  },
  {
    _id: 'q4',
    title: 'wenjuan4',
    isPublished: true,
    isStart: false,
    answerCount: 5,
    createAt: '3月10日 12:30',
  },
]

const List: FC = () => {
  useTitle('我的问卷')
  const [searchParams] = useSearchParams()
  console.log('keyword', searchParams.get('keyword'))

  const [questionList, setQuesionList] = useState(rawQuestionList)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>(搜索)</div>
      </div>
      <div className={styles.content}>
        {questionList.map(q => {
          const { _id } = q
          return <QuestionCard key={_id} {...q} />
        })}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  )
}

export default List
