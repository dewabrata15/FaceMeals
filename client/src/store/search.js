import { createSlice } from '@reduxjs/toolkit'

export const search = createSlice({
  name: 'search',
  initialState: {
    value: '',
  },
  reducers: {
    setSearch: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setSearch } = search.actions
export default search.reducer