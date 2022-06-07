import {createSlice} from "@reduxjs/toolkit";


export const ModalDisplaySlice=createSlice({
    name:"ModalDisplay",
    initialState:{
        openAjout:false,
        openDelete:false,
        openModify:false,
        openSnackbar:false,
        alert:{type:"none"}
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
        },
        handleOpenSnackbar:(state)=>{
            state.openSnackbar=!state.openSnackbar;
        },
        handleAlert:(state,action)=>{
            state.alert=action.payload
        }
    }
})

export const {handleOpenAjout}=ModalDisplaySlice.actions;
export const {handleOpenDelete}=ModalDisplaySlice.actions;
export const {handleOpenModify}=ModalDisplaySlice.actions;
export const {handleOpenSnackbar}=ModalDisplaySlice.actions;
export const {handleAlert}=ModalDisplaySlice.actions;




export default ModalDisplaySlice.reducer;