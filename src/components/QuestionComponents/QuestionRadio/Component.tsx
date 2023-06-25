import React, { FC } from 'react'
import { Radio, Space, Typography } from 'antd'
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from './interface'

const { Paragraph } = Typography
const { Group } = Radio

const Component: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const {
    title = '单选',
    isVertical = false,
    options = [],
    value = '',
  } = { ...QuestionRadioDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map(option => {
            const { value, text } = option
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            )
          })}
        </Space>
      </Group>
    </div>
  )
}

export default Component
