import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionService } from '../service/question'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer'
import { resetPageInfo } from '../store/pageInfoReducer'

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
    const {
      title = '',
      desc = '',
      js = '',
      css = '',
      componentList = [],
      isPublished = false,
      isStar = false,
      isDelete = false,
      answerCount = 0,
      createAt = '',
    } = data
    let selectedId = ''

    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }

    // 把 componentList 存储到 Redux store 中
    dispatch(resetComponents({ selectedId, componentList, copiedComponent: null }))

    // 把 pageInfo 存储到 Redux store 中
    dispatch(
      resetPageInfo({ title, desc, js, css, isPublished, isDelete, isStar, answerCount, createAt })
    )
  }, [data])

  // 根据 id 变化加载问卷
  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData
