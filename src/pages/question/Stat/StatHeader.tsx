import React, { FC, useRef } from 'react'
import styles from './StatHeader.module.scss'
import { Button, Input, InputRef, Popover, QRCode, Space, Tooltip, Typography, message } from 'antd'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useNavigate, useParams } from 'react-router-dom'

const { Title } = Typography

const StatHeader: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const pageInfo = useGetPageInfo()
  const { title, isPublished } = pageInfo
  const urlInputRef = useRef<InputRef>(null)

  function copy() {
    const elem = urlInputRef.current
    if (elem == null) return
    elem.select()
    document.execCommand('copy') // 拷贝选中内容
    message.success('拷贝成功')
  }

  // 生成链接和二维码
  function genLinkAndQRCodeElem() {
    if (!isPublished) return null

    const url = `http://localhost:8000/question/stat/${id}`

    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150} bordered={false} />
      </div>
    )

    return (
      <Space>
        <Input value={url} style={{ width: '500px' }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover overlayInnerStyle={{ padding: 0 }} content={QRCodeElem}>
          <Button shape="circle" icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQRCodeElem()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
