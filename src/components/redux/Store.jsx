
import { configureStore } from "@reduxjs/toolkit"
import loginReducer from "./Slices/loginSlice"

const store=configureStore({
    reducer:{
login:loginReducer
    }
})

export default store