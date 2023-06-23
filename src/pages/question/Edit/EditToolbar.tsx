import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import {
  changeComponentHidden,
  toggleComponentLocked,
  removeSelectedComponent,
  copySelectedComponent,
  pasteComponent,
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId: fe_id, selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}

  // 删除
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }

  // 隐藏组件
  function handleHidden() {
    dispatch(
      changeComponentHidden({
        fe_id,
        isHidden: true,
      })
    )
  }

  // 锁定组件
  function handleLocked() {
    dispatch(toggleComponentLocked(fe_id))
  }

  // 复制组件
  function copy() {
    dispatch(copySelectedComponent())
  }

  // 粘贴组件
  function paste() {
    if (copiedComponent) {
      dispatch(pasteComponent())
    }
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title="锁定/解锁">
        <Button
          type={isLocked ? 'primary' : 'default'}
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLocked}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          disabled={copiedComponent == null}
          shape="circle"
          icon={<BlockOutlined />}
          onClick={paste}
        ></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
