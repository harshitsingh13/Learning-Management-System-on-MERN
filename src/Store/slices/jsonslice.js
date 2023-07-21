import { createSlice } from '@reduxjs/toolkit'
import { useLocation } from 'react-router-dom';

 
const initialState = { subscription: {type:0,
 description:"question",
 topicid:0,
 complexityid:0,
 active:true,
 parentqnid:null,
 softdel:0,
 impressioncount:null,
 successcount:null,
 createdby:"Harshit",
 question:null,
 modifiedby:null} }

export const jsonSlice = createSlice({
  name: 'jsonObj',
  initialState,
  reducers: {
	  
    addUserData(state, action){ 
		let key=action.payload.key;
		let value=action.payload.value;
		state.subscription[key]=value;
	},
	updateUserData(state, action){ 
		state.subscription=action.payload;
	}
	
  },
    
})

export const { addUserData, updateUserData } = jsonSlice.actions

export default jsonSlice.reducer