import {combineReducers} from "@reduxjs/toolkit";
import{toast} from "react-hot-toast";
import {createSlice} from "@reduxjs/toolkit";
// initial state define
const initialState={
    user:null,
};
const profileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
state.user=value.payload;
        },
    },
});
export const {setUser}=profileSlice.actions;
export default profileSlice.reducer;
// Compare this snippet from src/slices/authSlice.js: