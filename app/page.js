import Image from "next/image";
import { Suspense } from "react";
import GridExample from "./components/AgGridTable";
import LeftMainComponent from "./components/LeftMainComponent";
import RightMainComponent from "./components/RightMainComponent";

export default function Home() {
  return (
    <section>
  <h1>Hello, Next.js!</h1>
  <section className="flex flex-row space-x-10 m-20">
  <Suspense fallback={<p>Loading feed ...</p>}>
    <LeftMainComponent />
  </Suspense>
  <Suspense fallback={<p>Loading User Selections...</p>}>
  <RightMainComponent />
  </Suspense>
  </section>

    </section>
  )
}
