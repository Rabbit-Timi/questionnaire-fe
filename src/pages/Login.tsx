import { UserAddOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Typography } from 'antd'
import React, { FC } from 'react'
import styles from './Login.module.scss'
import { Link } from 'react-router-dom'
import { REGISTER_PATHNAME } from '../router'

const { Title } = Typography

const Login: FC = () => {
  const onFinish = (values: unknown) => {
    console.log('Success:', values)
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>

          <Form.Item label="密码" name="password">
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登陆
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
