import {createSlice} from "@reduxjs/toolkit";


export const ModalDisplaySlice=createSlice({
    name:"ModalDisplay",
    initialState:{
        openAjout:false,
        openDelete:false,
        openModify:false,
    },
    reducers:{
        handleOpenAjout:(state)=>{
            state.openAjout=!state.openAjout;
        },
        handleOpenDelete:(state)=>{
            state.openDelete=!state.openDelete;
        },
        handleOpenModify:(state)=>{
            state.openModify=!state.openModify;
        }
    }
})

export const {handleOpenAjout}=ModalDisplaySlice.actions;
export const {handleOpenDelete}=ModalDisplaySlice.actions;
export const {handleOpenModify}=ModalDisplaySlice.actions;


export default ModalDisplaySlice.reducer;