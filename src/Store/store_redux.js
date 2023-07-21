// Index.jsx (STORE)
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/slice'
import jsonReducer from './slices/jsonslice'

export const store = configureStore({
  reducer: {
      counter: counterReducer,
	  jsonObj: jsonReducer,
  },
})

export default store