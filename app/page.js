import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";
import Mostviewed from "./components/Mostviewed";
import HomepageLoader from "./components/HomepageLoader";

export default function Home() {
  return (
    <section>
  <section className="flex flex-col space-x-10 m-10">
  <Suspense fallback={<HomepageLoader/>}>
    <Mostviewed />
  </Suspense>
  <Link href="/blogsData" className="text-slate-600 underline underline-offset-2 mt-8">Visit all blogs</Link>
  <Suspense fallback={<p>Loading User Selections...</p>}>
  </Suspense>
  </section>

    </section>
  )
}
