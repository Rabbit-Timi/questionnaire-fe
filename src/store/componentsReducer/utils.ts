import { ComponentInfoType, ComponentsStateType } from './index'

/**
 * @Author: timmtiy
 * @description: 获取下一个 selectedId
 * @param {string} fe_id 当前的 id
 * @param {Array} componentList
 * @return {*}
 */
export function getNextSelected(fe_id: string, componentList: Array<ComponentInfoType>) {
  const visibleComponentList = componentList.filter(c => !c.isHidden)
  const index = visibleComponentList.findIndex(c => c.fe_id === fe_id)

  // 未选中
  if (index < 0) return ''

  // 重新计算 selectedId
  let newSelectedId = ''
  const length = visibleComponentList.length
  if (length <= 1) {
    newSelectedId = ''
  } else {
    if (index + 1 == length) {
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }

  return newSelectedId
}

/**
 * @Author: timmtiy
 * @description: 插入新组件
 * @param {ComponentsStateType} draft
 * @param {ComponentInfoType} newComponent
 * @return {*}
 */
export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = draft
  const index = componentList.findIndex(c => c.fe_id === selectedId)

  // 未选中任何组件
  if (index < 0) {
    draft.componentList.push(newComponent)
  } else {
    draft.componentList.splice(index + 1, 0, newComponent)
  }
  draft.selectedId = newComponent.fe_id
}
