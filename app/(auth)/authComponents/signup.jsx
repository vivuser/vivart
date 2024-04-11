"use client"

import Modal from "@/app/components/Modal";
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
    const [showModal, setShowModal] = useState(false)
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

            const response = await axios.post('http://localhost:3001/auth/signup', {
                email: email,
                password: password,
                confirmPassword: confirmPassword
            });

            console.log(response, 'response')

            if (response.status === 201) {
                console.log('registered successfully')
                // setShowModal(true)
                dispatch(openModal({ content: "SignupModal", data: {} }));
            }else
                {
                throw new Error('Failed to register user');
            }
        }
        catch (error) {
            console.error('Error registering user:', error)
        }
    }

    return (
        <>
        <div className="flex flex-col mx-auto max-w-lg">
        <input placeholder="email" type="email" onChange={e=>setEmail(e.target.value)}/>
        {emailError && <p className="text-red-500">{emailError}</p>}
        <input placeholder="password" type="password" onChange={e=>setPassword(e.target.value)}/>
        {passwordError && <p className="text-red-500">{passwordError}</p>}
        <input placeholder="confirmPassword" type="password" onChange={e=>setConfirmPassword(e.target.value)}/>
        {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
        <button className="bg-gray-200 p-2 mx-auto" onClick={() => submitForm()}>Submit</button>
        {modalIsOpen && <Modal />}
        </div>
        </>
    )

}