import { UserAddOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Space, Typography, message } from 'antd'
import React, { FC, useEffect } from 'react'
import styles from './Login.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '../router'
import { useRequest, useTitle } from 'ahooks'
import { loginService } from '../service/user'
import { setToken } from '../utils/user-token'

const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

const Login: FC = () => {
  useTitle('登陆')
  const nav = useNavigate()

  const [form] = Form.useForm()

  const { run } = useRequest(
    async (username: string, password: string) => await loginService(username, password),
    {
      manual: true,
      onSuccess(result) {
        const { token = '' } = result
        setToken(token)
        message.success('登陆成功')
        nav(MANAGE_INDEX_PATHNAME)
      },
    }
  )

  useEffect(() => {
    const { username, password } = getUserFromStorage()
    form.setFieldsValue({ username, password })
  }, [])

  const onFinish = (values: any) => {
    const { username, password, remember } = values || {}
    run(username, password)
    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUserFromStorage()
    }
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
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '用户名长度 5-20 位' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>记住我</Checkbox>
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
