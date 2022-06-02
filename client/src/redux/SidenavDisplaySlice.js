import {createSlice} from "@reduxjs/toolkit";


export const SidenavDisplaySlice=createSlice({
    name:"SidenavDisplay",
    initialState:{
        open:true
    },
    reducers:{
        handleOpen:(state)=>{
            state.open=!state.open;
        }
    }
})

export const {handleOpen}=SidenavDisplaySlice.actions;

export default SidenavDisplaySlice.reducer;