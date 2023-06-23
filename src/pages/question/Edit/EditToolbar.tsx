import { DeleteOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { removeSelectedComponent } from '../../../store/componentsReducer'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏/显示">
        <Button shape="circle" icon={<DeleteOutlined />}></Button>
      </Tooltip>
      <Tooltip title="锁定/解锁">
        <Button shape="circle" icon={<DeleteOutlined />}></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<DeleteOutlined />}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button shape="circle" icon={<DeleteOutlined />}></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
