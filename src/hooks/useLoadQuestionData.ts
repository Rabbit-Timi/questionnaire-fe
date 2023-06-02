import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionService } from '../service/question'

function useLoadQuestionData() {
  const { id = '' } = useParams()

  // const [loading, setLoading] = useState(true)
  // const [questionData, setQuestionData] = useState({})

  // useEffect(() => {
  //   async function fn() {
  //     const data = await getQuestionService(id)
  //     setQuestionData(data)
  //     setLoading(false)
  //     console.log(data)
  //   }
  //   fn()
  // }, [])

  async function load() {
    const data = await getQuestionService(id)
    return data
  }

  const { loading, error, data } = useRequest(load)

  return { loading, error, data }
}

export default useLoadQuestionData
