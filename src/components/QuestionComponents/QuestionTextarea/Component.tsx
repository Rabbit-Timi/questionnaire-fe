import React, { FC } from 'react'
import { QuestionTextareaPropsType, QuestionTextareaDefaultProps } from './interface'
import { Input, Typography } from 'antd'

const { Paragraph } = Typography
const { TextArea } = Input

const QuestionTextarea: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title = '输入框标题', placeholder = '请输入' } = {
    ...QuestionTextareaDefaultProps,
    ...props,
  }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  )
}

export default QuestionTextarea
