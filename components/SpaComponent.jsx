import React, {useEffect, useState} from "react"
import {render} from "react-dom"


const SpaComponent = () => {
    let [text, updateText] = useState("")

    return(
        <input type ="text" value={text} />
    )
}



export {SpaComponent}