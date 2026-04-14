'use client'
import { useRef } from "react"
import { store } from "../redux/store"
import { Provider } from "react-redux"
import { initTracker } from "@/blocker-tracker/tracker.mjs"

export default function StoreProvider({children}) {
    const storeRef = useRef()
    if (!storeRef.current) {
        storeRef.current = store
    }

    initTracker({
  endpoint: "https://imperfectible-procoercion-wonda.ngrok-free.app/sdk/ingest",
  apiKey: "proj_d971ef99d15153d1",
  environment: "production"
});

    return <Provider store={storeRef.current}>{children}</Provider>
}
