import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
    },
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
        },
        loginFailure: (state,action) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = action.payload;
        },
        signupStart: (state) => {
            state.isLoading = true,
            state.error = null;
        },
        signupSucess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
        },
        signupFailure: (state, action) =>{
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = action.payload
        },
        logout: (state) =>{
            console.log('inside reducer')
            console.log(state?.user, 'state')
            console.log(state?.isAuthenticated, 'state')
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    signupStart,
    signupSucess,
    signupFailure,
    logout
} = authSlice.actions;

export const authReducer =  authSlice.reducer;