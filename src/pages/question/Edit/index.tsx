import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'
import { useTitle } from 'ahooks'

const Edit: FC = () => {
  const dispatch = useDispatch()
  const { id = '' } = useParams()

  const { loading } = useLoadQuestionData()

  useTitle(`问卷编辑 `)

  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      {/* <div style={{ backgroundColor: '#fff', height: '40px' }}>
        <EditHeader />
      </div> */}
      <EditHeader />
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              {/* <div style={{ height: '900px' }}>画布，测试滚动</div> */}
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
