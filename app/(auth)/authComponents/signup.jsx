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
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment } from "@mui/material";
import TextField from '@mui/material/TextField';


export default function RegisterForm() {

    const [isGithubLoading, setIsGithubLoading] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const modalIsOpen = useSelector(state => state.common.modal.isOpen)
    const router = useRouter();

    const handleLogin = () => {
        setIsLogin(!isLogin)
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }


    async function submitLoginForm() {
            setIsLoading(true);
            signIn('credentials', 
                {email,
                password,
                 redirect: false})
                 
                .then((callback) => {
                    if (callback?.error) {
                        toast.error(callback.error)
                    }
                    if (callback?.ok && !callback?.error){
                        setIsLoading(false)
                        toast.success('Logged in successfully!')
                        router.push('/')
                        router.refresh()                       
                    }
                })      
    }

    async function submitRegisterForm() {
        try{

            const validation = validateRegisterForm(name, email, password, confirmPassword)
            if (!validation.isValid) {
                setNameError(validation.errors.name || "")
                setEmailError(validation.errors.email || "");
                setPasswordError(validation.errors.password || "");
                setConfirmPasswordError(validation.errors.confirmPassword || "");
                return;
            }

            dispatch(signupStart());
            setIsLoading(true)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            });

            console.log(response, 'response')

            if (response.status === 201) {
                console.log('registered successfully')
                setIsLoading(false)
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

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleHidePassword = () => {
        setShowPassword(!showPassword)
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
        <>
        <input placeholder="Name" type="name" value={name} onChange={e=>setName(e.target.value)} className="p-1 m-2 mt-2"/>
        {nameError && <p className="text-red-500 pl-2">{nameError}</p>}
        </>
        }
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} className="p-1 m-2 mt-2"/>
        {emailError && <p className="text-red-500 pl-2">{emailError}</p>}
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} className="p-1 m-2"
        />
        
        {/* <TextField
        placeholder="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={e=>setPassword(e.target.value)}
        className="p-1 m-2 mt-2"
        InputProps={{
        endAdornment: (
        <InputAdornment position="end">
            {showPassword ? (
              <VisibilityIcon onClick={handleShowPassword} className="cursor-pointer"/>
            ) : (
              <VisibilityOffIcon onClick={handleHidePassword} className="cursor-pointer"/>
            )}
          </InputAdornment>
        ),
      }}
    /> */}


        {passwordError && <p className="text-red-500 pl-2">{passwordError}</p>}
        { !isLogin && 
        <>
        <input placeholder="Confirm Password" type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className="p-1 m-2"/>
        {confirmPasswordError && <p className="text-red-500 pl-2">{confirmPasswordError}</p>}
        </> }
        {isLogin ?
        <button className={`${isLoading ? 'bg-gray-200 text-gray-400' : 'bg-gray-300'} p-2 mx-auto mb-1`} onClick={() => submitLoginForm()}>Submit</button>
        :
        <button className={`${isLoading ? 'bg-gray-200 text-gray-400' : 'bg-gray-300'} p-2 mx-auto mb-1`}  onClick={() => submitRegisterForm()}>Submit</button>
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