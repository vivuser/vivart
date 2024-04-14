"use client"

import Modal from "@/app/components/Modal";
import { signupFailure, signupStart, signupSucess } from "@/app/redux/slices/authSlice";
import { openModal } from "@/app/redux/slices/commonSlice";
import { validateRegisterForm } from "@/app/utilities/validations/authValidations";
import axios from "axios";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";

export default function RegisterForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const dispatch = useDispatch();
    const modalIsOpen = useSelector(state => state.common.modal.isOpen)

    async function submitForm() {
        try{

            const validation = validateRegisterForm(email, password, confirmPassword)
            if (!validation.isValid) {
                setEmailError(validation.errors.email || "");
                setPasswordError(validation.errors.password || "");
                setConfirmPasswordError(validation.errors.confirmPassword || "");
                return;
            }

            dispatch(signupStart());

            const response = await axios.post('http://localhost:3001/auth/signup', {
                email: email,
                password: password,
                confirmPassword: confirmPassword
            });

            console.log(response, 'response')

            if (response.status === 201) {
                console.log('registered successfully')
                dispatch(signupSucess(response.data.userId));
                dispatch(openModal({ content: "SelectTags", data: {} }));
            }else
                {
                throw new Error('Failed to register user');
            }
        }
        catch (error) {
            console.error('Error registering user:', error)
            dispatch(signupFailure(error.message));
        }
    }

    return (
        <>
        {modalIsOpen ? <Modal /> : 
        <div className="flex flex-col mx-auto max-w-md bg-slate-100 mt-20 shadow-md">
        <h2 className="text-center font-semibold text-xl text-slate-700 font-sans m-2">Sign up</h2>
        <input placeholder="Email" type="email" onChange={e=>setEmail(e.target.value)} className="p-1 m-2 mt-2"/>
        {emailError && <p className="text-red-500 pl-2">{emailError}</p>}
        <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)} className="p-1 m-2"/>
        {passwordError && <p className="text-red-500 pl-2">{passwordError}</p>}
        <input placeholder="Confirm Password" type="password" onChange={e=>setConfirmPassword(e.target.value)} className="p-1 m-2"/>
        {confirmPasswordError && <p className="text-red-500 pl-2">{confirmPasswordError}</p>}
        <button className="bg-gray-300 p-2 mx-auto mb-1" onClick={() => submitForm()}>Submit</button>
        <h4 className="m-3 text-sm text-center font-sans">Already registered? <span className="underline underline-offset-2 text-slate-700 cursor-pointer ml-1">Login</span></h4>
        <h4 className="m-3 text-sm text-center font-sans">Login using <span className="underline underline-offset-2 text-slate-700 cursor-pointer ml-1">Github</span></h4>
        </div>
    }
        </>
    )

}