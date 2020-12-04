import React from "react"
import {render} from "react-dom"
import {SpaComponent} from "./components/SpaComponent";


const App = () =>{
    return(
        <SpaComponent/>
    )
}



render(<App/>, document.querySelector("#root"))