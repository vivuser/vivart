'use client'
import { useRef } from "react"
import { store } from "../redux/store"
import { Provider } from "react-redux"
import "../tracker-init";

export default function StoreProvider({children}) {
    const storeRef = useRef()
    if (!storeRef.current) {
        storeRef.current = store
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}
