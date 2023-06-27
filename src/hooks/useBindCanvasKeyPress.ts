/*
 * @Description: 快捷键绑定
 * @Author: timmtiy
 */

import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  removeSelectedComponent,
  copySelectedComponent,
  pasteComponent,
  selectPrevComponent,
  selectNextComponent,
} from '../store/componentsReducer'

function isActiveElementValid() {
  const activeElem = document.activeElement

  // 判断光标 是否选中到 input 等属性输入组件 以防误删
  // if (activeElem === document.body) return true

  // dnd-kit 加入后判断
  if (activeElem === document.body) return true
  if (activeElem?.matches('div[role="button"]')) return true

  return false
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch()

  // 删除
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })

  // 复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })

  // 粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteComponent())
  })

  // 选中上一个
  useKeyPress('uparrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })

  // 选中下一个
  useKeyPress('downarrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })
}

export default useBindCanvasKeyPress
