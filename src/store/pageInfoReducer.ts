import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type PageInfoStateType = {
  title: string
  desc?: string
  js?: string
  css?: string
}

const INIT_STATE: PageInfoStateType = {
  title: '',
  desc: '',
  js: '',
  css: '',
}

export const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (state: PageInfoStateType, action: PayloadAction<PageInfoStateType>) => {
      return action.payload
    },
  },
})

export const { resetPageInfo } = pageInfoSlice.actions
export default pageInfoSlice.reducer
