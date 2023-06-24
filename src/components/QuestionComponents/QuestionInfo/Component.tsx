import React, { FC } from 'react'
import { QuestionInfoDefaultProps, QuestionInfoPropsType } from './interface'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

const Component: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title = '问卷标题', desc = '问卷描述...' } = { ...QuestionInfoDefaultProps, ...props }

  const descList = desc.split('\n')
  return (
    <div style={{ textAlign: 'center' }}>
      <Title
        level={1}
        style={{
          fontSize: '24px',
        }}
      >
        {title}
      </Title>
      <Paragraph style={{ marginBottom: '0' }}>
        {descList.map((d, index) => {
          return (
            <span key={index}>
              {index > 0 && <br />}
              {d}
            </span>
          )
        })}
      </Paragraph>
    </div>
  )
}

export default Component
