import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionService } from '../service/question'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer'

function useLoadQuestionData() {
  const dispatch = useDispatch()
  const { id = '' } = useParams()

  const { loading, error, data, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷')
      const data = await getQuestionService(id)
      return data
    },
    { manual: true }
  )

  //根据 data 设置 redux store
  useEffect(() => {
    if (!data) return
    const { componentList = [] } = data
    let selectedId = ''

    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }

    dispatch(resetComponents({ selectedId, componentList }))
  }, [data])

  // 根据 id 变化加载问卷
  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData
