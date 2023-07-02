import { Result, Typography } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { getComponentStatService } from '../../../service/stat'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { SmileOutlined } from '@ant-design/icons'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, selectedComponentType } = props
  const { id = '' } = useParams()
  const [stat, setStat] = useState([])
  const { run } = useRequest(
    async (questionId, componentId) => await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat)
      },
    }
  )

  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId)
  }, [selectedComponentId])

  function genStatElem() {
    if (!selectedComponentId) return <Result icon={<SmileOutlined />} title="未选中组件" />

    const componentConf = getComponentConfByType(selectedComponentType)
    if (componentConf == null) return null

    const { StatComponent } = componentConf
    if (StatComponent == null) return <Result icon={<SmileOutlined />} title="该组件无统计图表" />
    else return <StatComponent stat={stat} />
  }

  return (
    <>
      <Title level={5}>图表统计</Title>
      <div style={{ marginTop: '50px', width: '350px' }}>{genStatElem()}</div>
    </>
  )
}

export default ChartStat
