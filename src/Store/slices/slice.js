import { createSlice } from '@reduxjs/toolkit'

const initialState = { userList: [] }
/*const initialState = {
  status: 'idle',
  userList: []
}*/

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
	  
    addUser(state, action){ 
		state.userList.push(action.payload)
	},
	
	deleteUser(state, action){
		state.userList.splice(action.payload,1);
	},
	
	updateAllUsers(state, action){
		state.userList=action.payload;
	}
	
  },
    
})

export const { addUser, deleteUser, updateAllUsers } = counterSlice.actions

export default counterSlice.reducer