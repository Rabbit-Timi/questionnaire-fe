import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '../router'
import styles from './Home.module.scss'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()

  // function clickHandler() {
  //   nav(LOGIN_PATHNAME)
  // }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份, 发布问卷 90份, 收到答卷 80份</Paragraph>
        <div>
          <Button
            type="primary"
            onClick={() => {
              nav(MANAGE_INDEX_PATHNAME)
            }}
          >
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
