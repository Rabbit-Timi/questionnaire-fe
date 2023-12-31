import React, { ChangeEvent, FC, useRef, useState } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Input, Space, Typography, message } from 'antd'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import type { InputRef } from 'antd'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/pageInfoReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { updateQuestionService } from '../../../service/question'

const { Title } = Typography

// 修改标题组件
const TitleElem: FC = () => {
  const inputRef = useRef<InputRef>(null)
  const dispatch = useDispatch()
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

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(changePageTitle(newTitle))
  }

  if (editState) {
    return (
      <Input
        ref={inputRef}
        value={title}
        onChange={handleChange}
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

// 保存按钮组件
const SaveButton: FC = () => {
  const { id } = useParams()
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    { manual: true }
  )

  // ctrl + s 快捷键保存
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })

  // 自动保存
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    { wait: 1000 }
  )

  return (
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : ''}>
      保存
    </Button>
  )
}

// 发布按钮组件
const PublishButton: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: publish } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        nav('/question/stat/' + id)
      },
    }
  )

  return (
    <Button
      type="primary"
      onClick={publish}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : ''}
    >
      发布
    </Button>
  )
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
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
