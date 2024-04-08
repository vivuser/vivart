'use client'
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
    const [state, formAction] = useFormState()

return (
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
)

}