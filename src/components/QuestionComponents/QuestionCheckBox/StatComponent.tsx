import React, { FC } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { QuestionCheckBoxStatPropsType } from './interface'

const StatComponent: FC<QuestionCheckBoxStatPropsType> = (props: QuestionCheckBoxStatPropsType) => {
  const { stat } = props
  return (
    <div style={{ width: '350px', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={300}
          height={400}
          data={stat}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponent
