import { useState } from "react";
import GlobalStateContext from "./GlobalContext";

export const GlobalState = (props) => {
    const token = localStorage.getItem('token')


    const states = { }
    const setters = { }

    return (
        <GlobalStateContext.Provider value={{ states, setters, token }}>
            {props.children}
        </GlobalStateContext.Provider>
    )
}