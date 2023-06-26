import React, { ChangeEvent, FC, useRef, useState } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import styles from './Layers.module.scss'
import { Button, Input, InputRef, Space, message } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  toggleComponentLocked,
} from '../../../store/componentsReducer'

const Layers: FC = () => {
  const inputRef = useRef<InputRef>(null)
  const dispatch = useDispatch()
  const { componentList, selectedId } = useGetComponentInfo()

  const [changingTitleId, setChangingTitleId] = useState('')

  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不可选中隐藏的组件')
    } else {
      if (fe_id !== selectedId) {
        dispatch(changeSelectedId(fe_id))
        setChangingTitleId('')
      } else if (fe_id === selectedId) {
        // setChangingTitleId(fe_id)
        Promise.resolve()
          .then(() => {
            setChangingTitleId(fe_id)
          })
          .then(() => {
            if (inputRef.current) {
              inputRef.current.focus({
                cursor: 'end',
              })
            }
          })
      }
    }
  }

  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    // if (!newTitle) return
    if (!selectedId) return

    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }

  // 锁定/解锁 组件
  function handleLocked(fe_id: string) {
    dispatch(toggleComponentLocked(fe_id))
  }

  // 隐藏/显示 组件
  function handleHidden(fe_id: string, isHidden = false) {
    dispatch(
      changeComponentHidden({
        fe_id,
        isHidden: !isHidden,
      })
    )
  }

  return (
    <>
      {componentList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c

        // 拼接 class name
        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: selectedId === fe_id,
        })

        return (
          <div key={fe_id} className={styles.wrapper}>
            <div
              className={titleClassName}
              onClick={() => {
                handleTitleClick(fe_id)
              }}
            >
              {fe_id === changingTitleId && (
                <Input
                  ref={inputRef}
                  allowClear
                  value={title}
                  onChange={changeTitle}
                  onPressEnter={() => setChangingTitleId('')}
                  onBlur={() => setChangingTitleId('')}
                />
              )}
              {fe_id !== changingTitleId && title}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button
                  className={styles.btn}
                  icon={isHidden ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  type={isHidden ? 'primary' : 'text'}
                  shape="circle"
                  size="small"
                  onClick={() => {
                    handleHidden(fe_id, isHidden)
                  }}
                />
                <Button
                  className={styles.btn}
                  icon={isLocked ? <LockOutlined /> : <UnlockOutlined />}
                  type={isLocked ? 'primary' : 'text'}
                  shape="circle"
                  size="small"
                  onClick={() => {
                    handleLocked(fe_id)
                  }}
                />
              </Space>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Layers
