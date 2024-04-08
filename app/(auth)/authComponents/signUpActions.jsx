"use client"
import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next/react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { userAuthSchema } from "@/app/lib/validations/auth"

export async function signupForm() {
const { register, handleSubmit} = useForm(userAuthSchema)
const [isLoading, setIsLoading] = useState(false)
const searchParams = useSearchParams()

async function onSubmit(){
    setIsLoading(true)

    const signupResult = aw
}

    
}