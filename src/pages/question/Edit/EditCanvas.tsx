import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import classNames from 'classnames'
import { Spin } from 'antd'
import { ComponentInfoType, changeSelectedId } from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'

type PropsType = {
  loading: boolean
}

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null

  const { Component } = componentConf
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const dispatch = useDispatch()
  const { selectedId, componentList } = useGetComponentInfo()

  function handleClick(event: MouseEvent, id: string) {
    // 阻止冒泡 防止冒泡到 main 直接清空selectId
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin></Spin>
      </div>
    )
  }

  return (
    <div className={styles.canvas}>
      {componentList.map(c => {
        const { fe_id } = c

        // 拼接 class name
        const wrapperDefaultClassName = styles['component-wrapper']
        const selectedClassName = styles.selected
        const wrapperClassName = classNames({
          [wrapperDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        })

        return (
          <div
            key={fe_id}
            className={wrapperClassName}
            onClick={e => {
              handleClick(e, fe_id)
            }}
          >
            <div className={styles.component}>{genComponent(c)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default EditCanvas
