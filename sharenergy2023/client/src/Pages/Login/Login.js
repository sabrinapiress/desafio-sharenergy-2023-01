import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import Header from '../../components/Header/Header';
import { goToHome, goToLogin, goToRegister } from '../../Router/Router';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (event) => {
    try {
      event.preventDefault()
      const res = await fetch("http://localhost:1337/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const data = await res.json()

      if (data.message?.includes("Submit all fields for registration")) {
        alert('Preencha todos os campos!')

      } else if (data.message?.includes("Invalid value")) {
        alert('Insira um e-mail ou senha válido!')

      } else if (data.message?.includes("Email or password not found")){
        alert('Email ou senha não cadastrados!')

      }else if (data.message?.includes("User Name or password not found")){
        alert('Email ou senha não cadastrados!')

      }else {
        localStorage.setItem('token', data.token)
        goToHome()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Header btn1={'Cadastrar'} btn2={"Login"} route1={goToRegister} route2={goToLogin}/>
      <LoginForm email={email} password={password} loginUser={loginUser} setPassword={setPassword} setEmail={setEmail} />
    </div>
  );
}