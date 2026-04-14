"use client"
import { useState } from "react"


const NewComponent = () => {

    const [count, setCount] = useState('')



    return (
        <div>
             {count}
        </div>
    )

}

export default NewComponent