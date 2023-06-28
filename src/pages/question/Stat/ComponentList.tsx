import React, { FC, MouseEvent } from 'react'
import styles from './ComponentList.module.scss'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import classNames from 'classnames'
import { ComponentInfoType } from '../../../store/componentsReducer'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null

  const { Component } = componentConf
  return <Component {...props} />
}

const ComponentList: FC<PropsType> = ({
  selectedComponentId,
  setSelectedComponentId,
  setSelectedComponentType,
}) => {
  const { componentList } = useGetComponentInfo()

  function handleClick(event: MouseEvent, id: string, type: string) {
    // 阻止冒泡 防止冒泡到 main 直接清空selectId
    event.stopPropagation()
    setSelectedComponentId(id)
    setSelectedComponentType(type)
  }

  return (
    <div className={styles.canvas}>
      {componentList
        .filter(c => !c.isHidden)
        .map(c => {
          const { fe_id, isLocked, type } = c

          // 拼接 class name
          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassName = styles.selected
          const lockedClassName = styles.locked
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedComponentId,
            [lockedClassName]: isLocked,
          })

          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={e => {
                handleClick(e, fe_id, type)
              }}
            >
              <div className={styles.component}>{genComponent(c)}</div>
            </div>
          )
        })}
    </div>
  )
}

export default ComponentList
