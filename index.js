import React from "react"
import {render} from "react-dom"
import {UserAdder} from "./components/UserAdder";


const App = () =>{
    return(
        <UserAdder/>
    )
}



render(<App/>, document.querySelector("#root"))