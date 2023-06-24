import React, { FC } from 'react'
import { QuestionParagraphDefaultProps, QuestionParagraphPropsType } from './interface'
import { Typography } from 'antd'

const { Paragraph } = Typography

const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
      {text}
    </Paragraph>
  )
}

export default Component
