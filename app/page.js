import Image from "next/image";
import { Suspense } from "react";
import GridExample from "./components/AgGridTable";

export default function Home() {
  return (
    <section>
  <h1>Hello, Next.js!</h1>
  <Suspense fallback={<p>Loading feed ...</p>}>
  </Suspense>
  <Suspense fallback={<p>Loading User Selections...</p>}>
  </Suspense>

    </section>
  )
}
