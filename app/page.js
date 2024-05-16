import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";
import Mostviewed from "./components/Mostviewed";

export default function Home() {
  return (
    <section>
  <h1>Hello, Next.js!</h1>
  <section className="flex flex-col space-x-10 m-10">
  <Suspense fallback={<p>Loading feed ...</p>}>
    <Mostviewed />
  </Suspense>
  <Link href="/blogsData" className="text-slate-600 underline underline-offset-2 mt-8">Visit all blogs</Link>
  <Suspense fallback={<p>Loading User Selections...</p>}>
  </Suspense>
  </section>

    </section>
  )
}
