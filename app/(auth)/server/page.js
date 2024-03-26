import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ServerPage(){
    const session = await getServerSession(options)

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/server')
    }

    return (
        <section className="flex flex-col gap-6">
            User: {session?.user.name}
        </section>
    )
}