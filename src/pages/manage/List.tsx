import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'
import { useSearchParams } from 'react-router-dom'
import { Empty, Spin, Typography } from 'antd'
import ListSearch from '../../components/ListSearch'
import { getQuestionListService } from '../../service/question'
import { LIST_SEARCH_PARAM_KEY, LIST_PAGE_SIZE } from '../../constant'

const { Title } = Typography

const List: FC = () => {
  useTitle('我的问卷')

  const [searchParams] = useSearchParams()

  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)

  const haveMoreData = total > list.length
  const [start, setStarted] = useState(false) // 标记是否已经开始加载（防抖有延迟时间）
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  const containerRef = useRef<HTMLDivElement>(null)

  // 触发加载
  // function tryLoadMore() {
  //   console.log('loading...')
  // }

  // 触发加载 - 防抖
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem == null) return
      // 获取元素与视口各个方向的高度
      const domReact = elem.getBoundingClientRect()
      if (domReact == null) return
      const { bottom } = domReact
      if (bottom <= document.body.clientHeight) {
        load()
        setStarted(true)
      }
    },
    {
      wait: 1000,
    }
  )

  // 当页面加载，或 url 参数 keyword 变化时，触发加载
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  // 当页面滚动时触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }

    // 当组件销毁时，解绑该事件
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  // keyword 变化时，重置信息
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setTotal(0)
    setList([])
  }, [keyword])

  const loadMoreContentElem = useMemo(() => {
    if (!start || loading) return <Spin />
    if (total === 0) return <Empty />
    if (!haveMoreData) return <span>没有更多数据</span>
    return <span>开始加载下一页</span>
  }, [start, loading, haveMoreData])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{loadMoreContentElem}</div>
      </div>
    </>
  )
}

export default List
