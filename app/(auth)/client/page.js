'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default function ClientPage () {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/client')
        }
    })

    console.log(session, 'session..')

    return (
            <section className="flex flex-col gap-6">
                Session User: {session?.user?.name}
            </section>
    )
}
