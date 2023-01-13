import { useState } from "react";
import GlobalStateContext from "./GlobalContext";

export const GlobalState = (props) => {
    const token = localStorage.getItem('token')
    const [showComponent, setShowComponent] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [cellphone, setCellphone] = useState('')
    const [address, setAddress] = useState('')
    const [cpf, setCpf] = useState('')

    const states = { showComponent,showEditForm, id,name, email, cellphone, address, cpf }
    const setters = { setShowComponent, setShowEditForm, setName, setId, setEmail, setCellphone, setAddress, setCpf }

    return (
        <GlobalStateContext.Provider value={{ states, setters, token }}>
            {props.children}
        </GlobalStateContext.Provider>
    )
}