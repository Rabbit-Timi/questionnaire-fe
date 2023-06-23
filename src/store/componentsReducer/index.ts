import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelected, insertNewComponent } from './utils'
import cloneDeep from 'lodash.clonedeep'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | undefined | null
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: undefined,
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    // 修改 selectedId
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    }),
    // 添加新组件
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload

        insertNewComponent(draft, newComponent)
      }
    ),
    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload

        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          }
        }
      }
    ),
    // 删除选中组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId: removedId, componentList = [] } = draft

      // 重新计算 selectedId
      const newSelectedId = getNextSelected(removedId, componentList)

      const index = componentList.findIndex(c => c.fe_id === removedId)
      if (index >= 0) {
        componentList.splice(index, 1)
      }

      draft.selectedId = newSelectedId
    }),
    // 隐藏/显示组件
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { componentList } = draft
        const { fe_id, isHidden } = action.payload

        // 重新计算 selectedId
        let newSelectedId = ''
        if (isHidden) {
          newSelectedId = getNextSelected(fe_id, componentList)
        } else {
          newSelectedId = fe_id
        }

        const curComp = componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isHidden = isHidden
        }

        draft.selectedId = newSelectedId
      }
    ),
    // 锁定/解锁组件
    toggleComponentLocked: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      const { componentList } = draft
      const fe_id = action.payload

      const curComp = componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.isLocked = !curComp.isLocked
      }
    }),
    // 复制选中组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const curComp = componentList.find(c => c.fe_id === selectedId)
      if (curComp === null) return
      draft.copiedComponent = cloneDeep(curComp)
    }),
    // 粘贴组件
    pasteComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft
      if (copiedComponent) {
        copiedComponent.fe_id = nanoid()
        insertNewComponent(draft, copiedComponent)
      }
    }),
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteComponent,
} = componentsSlice.actions
export default componentsSlice.reducer
