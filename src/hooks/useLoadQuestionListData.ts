import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../service/question'
import { LIST_SEARCH_PARAM_KEY } from '../constant'
import { type } from 'os'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar = undefined, isDeleted = undefined } = opt
  const [searchParams] = useSearchParams()
  console.log('keyword', searchParams.get('keyword'))

  const {
    loading,
    error,
    data = {},
  } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const data = await getQuestionListService({ keyword, isStar, isDeleted })
      return data
    },
    {
      refreshDeps: [searchParams], // 刷新的依赖项
    }
  )
  return {
    loading,
    error,
    data,
  }
}

export default useLoadQuestionListData
