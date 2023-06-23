import { ComponentInfoType } from './index'

/**
 * @Author: timmtiy
 * @description: 获取下一个 selectedId
 * @param {string} fe_id 当前的 id
 * @param {Array} componentList
 * @return {*}
 */
export function getNextSelected(fe_id: string, componentList: Array<ComponentInfoType>) {
  const index = componentList.findIndex(c => c.fe_id === fe_id)

  // 未选中
  if (index < 0) return ''

  // 重新计算 selectedId
  let newSelectedId = ''
  const length = componentList.length
  if (length <= 1) {
    newSelectedId = ''
  } else {
    if (index + 1 == length) {
      newSelectedId = componentList[index - 1].fe_id
    } else {
      newSelectedId = componentList[index + 1].fe_id
    }
  }

  return newSelectedId
}
