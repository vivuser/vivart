"use client"

import axios from "axios";
import { useState } from "react"

export default function RegisterForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function submitForm() {
        try{
            const response = await axios.post('http://localhost:3001/auth/signup', {
                email: email,
                password: password,
                confirmPassword: confirmPassword
            });

            if (response.ok) {
                console.log('registered successfully')
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
        <input placeholder="email" type="email" onChange={e=>e.target.value}/>
        <input placeholder="password" type="password" onChange={e=>e.target.value}/>
        <input placeholder="confirmPassword" type="password" onChange={e=>e.target.value}/>
        <button className="bg-gray-200 p-2 mx-auto" onClick={() => submitForm()}>Submit</button>
        </div>
        </>
    )

}