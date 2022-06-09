import {createSlice} from "@reduxjs/toolkit";


export const ModalDisplaySlice=createSlice({
    name:"ModalDisplay",
    initialState:{
        openAjout:false,
        openDelete:false,
        openModify:false,
        openSnackbar:false,
        alert:{type:"none"},
        filiere:{nom:""},
        specialite:{nom_specialite:""},
        niveau:{nom_niveau:""}
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
        },
        handleFiliere:(state,action)=>{
            state.filiere=action.payload;
        },
        handleSpecialite:(state,action)=>{
            state.specialite=action.payload;
        },
        handleNiveau:(state,action)=>{
            state.niveau=action.payload;
        }
    }
})

export const {handleOpenAjout}=ModalDisplaySlice.actions;
export const {handleOpenDelete}=ModalDisplaySlice.actions;
export const {handleOpenModify}=ModalDisplaySlice.actions;
export const {handleOpenSnackbar}=ModalDisplaySlice.actions;
export const {handleAlert}=ModalDisplaySlice.actions;
export const {handleFiliere}=ModalDisplaySlice.actions;
export const {handleSpecialite}=ModalDisplaySlice.actions;
export const {handleNiveau}=ModalDisplaySlice.actions;





export default ModalDisplaySlice.reducer;