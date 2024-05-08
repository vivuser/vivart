"use client"

import Modal from "@/app/components/Modal";
import { loginSuccess, signupFailure, signupStart, signupSucess } from "@/app/redux/slices/authSlice";
import { openModal } from "@/app/redux/slices/commonSlice";
import { validateRegisterForm } from "@/app/utilities/validations/authValidations";
import axios from "axios";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import options from "@/app/api/auth/[...nextauth]/options";
import { toast } from "react-hot-toast"
import { useHistory } from 'react-router-dom';
import { useRouter } from "next/navigation";


export default function RegisterForm() {

    const [isGithubLoading, setIsGithubLoading] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const modalIsOpen = useSelector(state => state.common.modal.isOpen)
    const router = useRouter();

    const handleLogin = () => {
        setIsLogin(!isLogin)
    }

    console.log(options, 'options...')

    async function submitLoginForm() {
            signIn('credentials', 
                {email,
                password,
                 redirect: false})
                 
                .then((callback) => {
                    if (callback?.error) {
                        toast.error(callback.error)
                    }
                    if (callback?.ok && !callback?.error){
                        console.log('09090909')
                        toast.success('Logged in successfully!')
                        router.push('/')
                        
                    }
                })      
    }

    async function submitRegisterForm() {
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
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            });

            console.log(response, 'response')

            if (response.status === 201) {
                console.log('registered successfully')
                
                dispatch(signupSucess(response.data));
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
        {isLogin ?    
        <h2 className="text-center font-semibold text-xl text-slate-700 font-sans m-2">Login</h2>
        :
        <h2 className="text-center font-semibold text-xl text-slate-700 font-sans m-2">Sign up</h2>
        }
        {!isLogin && 
        <input placeholder="Name" type="name" onChange={e=>setName(e.target.value)} className="p-1 m-2 mt-2"/>
        }
        <input placeholder="Email" type="email" onChange={e=>setEmail(e.target.value)} className="p-1 m-2 mt-2"/>
        {emailError && <p className="text-red-500 pl-2">{emailError}</p>}
        <input placeholder="Password" type="password" onChange={e=>setPassword(e.   target.value)} className="p-1 m-2"/>
        {passwordError && <p className="text-red-500 pl-2">{passwordError}</p>}
        { !isLogin && 
        <>
        <input placeholder="Confirm Password" type="password" onChange={e=>setConfirmPassword(e.target.value)} className="p-1 m-2"/>
        {confirmPasswordError && <p className="text-red-500 pl-2">{confirmPasswordError}</p>}
        </> }
        {isLogin ?
        <button className="bg-gray-300 p-2 mx-auto mb-1" onClick={() => submitLoginForm()}>Submit</button>
        :
        <button className="bg-gray-300 p-2 mx-auto mb-1" onClick={() => submitRegisterForm()}>Submit</button>
        }
        {!isLogin && 
        <h4 className="m-3 text-sm text-center font-sans">Already registered? <span className="underline underline-offset-2 text-slate-700 cursor-pointer ml-1" onClick={() => handleLogin()}>Login</span></h4>
        }

{isLogin && 
        <>
        <h4 className="m-3 text-sm text-center font-sans">New here? <span className="underline underline-offset-2 text-slate-700 cursor-pointer ml-1" onClick={() => handleLogin()}>Register</span></h4>
        </>
        }

        
        <hr className="my-1 mx-4" />  
        <div className="flex flex-wrap mx-auto">
        <h4 className="m-2 text-sm text-center font-sans">Login using <span className="underline underline-offset-2 text-slate-700 cursor-pointer ml-1"><GitHubIcon className="text-slate-600" onClick={() => signIn('github', { callbackUrl: '/' })}/></span></h4>
        <h4 className="m-2 text-sm text-center font-sans"><span className="underline underline-offset-2 text-slate-700 cursor-pointer ml-1"><GoogleIcon className="text-slate-600"/></span></h4>
        </div>

        </div>
    }
        </>
    )

}