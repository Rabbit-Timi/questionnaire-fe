import React, { FC, useRef, useState } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Input, Space, Typography } from 'antd'
import { EditOutlined, LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import type { InputRef } from 'antd'

const { Title } = Typography

// 修改标题
const TitleElem: FC = () => {
  const inputRef = useRef<InputRef>(null)
  const pageInfo = useGetPageInfo()
  const { title } = pageInfo

  const [editState, setEditState] = useState(false)

  function handleClick() {
    Promise.resolve()
      .then(() => {
        setEditState(true)
      })
      .then(() => {
        if (inputRef.current) {
          inputRef.current.focus({
            cursor: 'end',
          })
        }
      })
  }

  if (editState) {
    return (
      <Input
        ref={inputRef}
        value={title}
        onPressEnter={() => {
          setEditState(false)
        }}
        onBlur={() => {
          setEditState(false)
        }}
      />
    )
  } else {
    return (
      <Space>
        <Title>{title}</Title>
        <Button icon={<EditOutlined />} type="text" onClick={handleClick} />
      </Space>
    )
  }
}

// 编辑器头部布局
const EditHeader: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
