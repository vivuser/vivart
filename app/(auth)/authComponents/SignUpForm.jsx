'use client'
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
    message: "",
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" aria-disabled={pending} className="bg-violet-100 rounded-md mx-auto p-2 m-1">
            Submit
        </button>
    )
}

export function SignUpForm() {
    const [state, formAction] = useFormState(register, initialState)
    const [showModal, setShowModal] = useState(false);

    async function register(previousState, formData){
        const formFields = {
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };
        console.log(formFields , 'formData on client');
        if (formFields.password !== formFields.confirmPassword) {
            return { message: "Passwords do not match "};
        }
        try{
            const response = await fetch('http://localhost:3001/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(formFields)
            });

            if (response.ok) {
                console.log('registered successfully')
            }else
                {
                throw new Error('Failed to register user');
            }
        } catch (error) {
            console.error('Error registering user:', error)
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!state.message) {
            formAction();
            setShowModal(true)
        }
    }

return (
    <>
    <form action={formAction} className="flex flex-col max-w-md mx-auto bg-slate-200 rounded-sm mt-10">  
        <label htmlFor="signUp" className="text-center m-2 text-xl font-bold">Register</label>
        <input type="email" id="email" name="email" placeholder="email" className="border border-gray-300 m-2 p-1 rounded-sm" required/>
        <input type="password" id="password" name="password" placeholder="password" className="border border-gray-300  m-2 p-1 rounded-sm"  required/>
        <input type="confirmPassword" id="confirmPassword" name="confirmPassword" className="border border-gray-300  m-2 p-1 rounded-sm"  placeholder="confirm password" required/>
        <SubmitButton />
        <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
           {showModal && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                    <p>Registration successful!</p>
                </div>
            </div>
        )}
</>)

}