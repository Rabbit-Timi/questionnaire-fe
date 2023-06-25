import React, { FC, useEffect } from 'react'
import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import { OptionType, QuestionRadioPropsType } from './interface'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, options = [], value, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      title,
      isVertical,
      options,
      value,
    })
  }, [title, isVertical, options, value])

  function handleValueChange() {
    if (onChange) {
      const newValues = form.getFieldsValue() as QuestionRadioPropsType
      const { options = [] } = newValues

      options.forEach(opt => {
        if (opt.value) return
        opt.value = nanoid()
      })
      onChange(newValues)
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, options, value }}
      form={form}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题内容' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name }, index) => (
                <Space key={key}>
                  {/* 选项输入框 */}
                  <Form.Item
                    name={[name, 'text']}
                    rules={[
                      { required: true, message: '请输入选项内容' },
                      {
                        validator: (_, text) => {
                          const { options = [] } = form.getFieldsValue()

                          let num = 0
                          options.forEach((option: OptionType) => {
                            if (option.text === text) num++
                          })
                          if (num === 1) return Promise.resolve()
                          return Promise.reject(new Error('和其他选项重复了'))
                        },
                      },
                    ]}
                  >
                    <Input placeholder="请输入选项内容"></Input>
                  </Form.Item>
                  {/* 选项删除按钮 */}
                  {index > 1 && (
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(name)
                      }}
                    ></MinusCircleOutlined>
                  )}
                </Space>
              ))}
              <Form.Item>
                {/* 增加选项按钮 */}
                <Button
                  type="link"
                  onClick={() => {
                    add({ text: '', value: '' })
                  }}
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options.map(({ text, value }) => ({ value, label: text || '' }))}
        ></Select>
      </Form.Item>
      <Form.Item valuePropName="checked" name="isVertical">
        <Checkbox>垂直显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
