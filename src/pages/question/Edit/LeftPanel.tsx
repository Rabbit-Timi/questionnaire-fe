import React, { FC } from 'react'
import { Tabs } from 'antd'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentLib from './ComponentLib'
import styles from './LeftPanel.module.scss'
import Layers from './Layers'

const LeftPanel: FC = () => {
  const tabItems = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined />
          组件库
        </span>
      ),
      children: (
        <div className={styles['children-wrapper']}>
          <ComponentLib />
        </div>
      ),
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: (
        <div className={styles['children-wrapper']}>
          <Layers />
        </div>
      ),
    },
  ]

  return <Tabs defaultActiveKey="componentLib" items={tabItems} />
}

export default LeftPanel
