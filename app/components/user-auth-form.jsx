"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
export function UserAuthForm() {

    const [isLoading, setIsLoading] = useState(false);
    const [isGithubLoading, setIsGithubLoading] = useState(false);

return (
    <div>
        Continue with Github
        <br />
        <button 
        onClick={() => signIn("github")}> Github Login </button>
    </div>
)

}