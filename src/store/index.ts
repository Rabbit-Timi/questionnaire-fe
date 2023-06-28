import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoStateType } from './pageInfoReducer'

import undoable, { StateWithHistory, excludeAction } from 'redux-undo'

export type StateType = {
  user: UserStateType
  // components: ComponentsStateType
  components: StateWithHistory<ComponentsStateType>
  pageInfo: PageInfoStateType
}

export default configureStore({
  reducer: {
    user: userReducer,
    // components: componentsReducer,
    components: undoable(componentsReducer, {
      limit: 20,
      // 下列方法 不记录到撤销重做的存储结构中
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
})
