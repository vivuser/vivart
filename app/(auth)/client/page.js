'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default function ClientPage () {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(`${process.env.AUTH_URL}/api/auth/signin?callbackUrl=/client`)
        }
    })


    return (
            <section className="flex flex-col gap-6">
                Session User: {session?.user?.name}
            </section>
    )
}
