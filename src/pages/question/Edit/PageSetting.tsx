import React, { FC, useEffect } from 'react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/pageInfoReducer'

const { TextArea } = Input

const PageSetting: FC = () => {
  const dispatch = useDispatch()
  const pageInfo = useGetPageInfo()
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  function handlerValuesChange() {
    console.log(form.getFieldsValue())
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handlerValuesChange}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: '请输入问卷标题' }]}
      >
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea placeholder="请输入问卷描述" />
      </Form.Item>
      <Form.Item label="js代码" name="js">
        <TextArea placeholder="请输入js" />
      </Form.Item>
      <Form.Item label="css代码" name="css">
        <TextArea placeholder="请输入css" />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
