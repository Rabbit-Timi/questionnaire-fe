import { useTitle } from 'ahooks'
import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { Empty, Table, Typography, Tag, Space, Button, message, Modal, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  useTitle('回收站')
  const { loading, error, data = {} } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data

  const [selectedIds, setSelectedIds] = useState<string[]>([])

  function del() {
    confirm({
      title: '确认彻底删除所选问卷',
      content: '删除以后不可找回',
      icon: <ExclamationCircleOutlined />,
      onOk: () => message.success(`删除${selectedIds}`),
      okText: '确认',
      cancelText: '取消',
    })
  }
  const tableColumns = [
    {
      title: '名称',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '是否星标',
      dataIndex: 'isStar',
      render: (isStar: boolean) => {
        return isStar ? <Tag color="processing">已标星</Tag> : <Tag>未标星</Tag>
      },
    },
    {
      title: '问卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
    },
  ]

  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Trash
