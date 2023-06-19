import React, { FC } from 'react'
import { QuestionInputPropsType, QuestionInputDefaultProps } from './interface'
import { Input, Typography } from 'antd'

const { Paragraph } = Typography

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title = '输入框标题', placeholder = '请输入' } = {
    ...QuestionInputDefaultProps,
    ...props,
  }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
}

export default QuestionInput
