import { createSlice } from "@reduxjs/toolkit"


const loginSlice=createSlice({
    name:'login',
   initialState:{
   showAuthPage:'SignUp'
   },
   reducers:{
toggleLoginSearchView:(state,action)=>{
state.showAuthPage=action.payload
}
   }


})
export const {toggleLoginSearchView}=loginSlice.actions
export default loginSlice.reducer