import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React, { FC } from 'react'
import ComponentProp from './ComponentProp'

const RightPanel: FC = () => {
  const tabItems = [
    {
      key: 'prop',
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: (
        <div>
          <ComponentProp />
        </div>
      ),
    },
    {
      key: 'layers',
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <div>设置</div>,
    },
  ]
  return <Tabs defaultActiveKey="componentLib" items={tabItems} />
}

export default RightPanel
