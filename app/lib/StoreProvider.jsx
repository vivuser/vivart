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
  endpoint: "http://localhost:3001/sdk/ingest",
  apiKey: "proj_430a2d7af64c39b6",
  environment: "production"
});

    return <Provider store={storeRef.current}>{children}</Provider>
}
