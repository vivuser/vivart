import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modal: {
        isOpen: false,
        content: null,
        data: {},
    },
    snackbar: {
        isOpen: false,
        color: 'primary',
        icon: '',
        content: '',
        autoHideDuration: 5000,
    }
};

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.modal.isOpen = true;
            state.modal.content = action.payload.content;
            state.modal.data = action.payload.data;
        },
        closeModal: (state) => {
            state.modal.isOpen = false;
            state.modal.content = null;
            state.modal.data = {};
        },
        openSnackbar: (state, action) => {
            state.snackbar.isOpen = true;
            state.snackbar.color = action.payload.color || initialState.snackbar.color;
            state.snackbar.icon = action.payload.icon || initialState.snackbar.icon;
            state.snackbar.content = action.payload.content;
            state.snackbar.autoHideDuration = 
                action.payload.autoHideDuration || initialState.snackbar.autoHideDuration;
        },
        closeSnackbar: (state) => {
            state.snackbar.isOpen = false;
            state.snackbar.content = '';
        }
    }
});

export const {
    openModal,
    closeModal,
    openSnackbar,
    closeSnackbar,
} = commonSlice.actions;

export const commonReducer = commonSlice.reducer;