import React, { FC } from 'react'
import { Outlet, Link } from 'react-router-dom'
import styles from './ManageLayout.module.scss'

const ManageLayout: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p>ManageLayout left</p>
        <button>创建问卷</button>
        <br />
        <Link to="/manage/list">我的问卷</Link>
        <br />
        <Link to="/manage/star">星标问卷</Link>
        <br />
        <Link to="/manage/trash">回收站</Link>
      </div>
      <div className={styles.right}>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default ManageLayout
