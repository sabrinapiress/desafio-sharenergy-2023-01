import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import Header from '../../components/Header/Header';
import { goToHome, goToLogin, goToRegister } from '../../Router/Router';
import { useStyles } from './styled';

export default function Register() {
  const classes = useStyles();
  const [userName, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const registerUser = async (event) => {
    try {
      event.preventDefault()

      if (password.length < 6) {
        alert("Senha precisa conter mais que 6 digitos")

      } else if (!email.includes("@")) {
        alert('E-mail inválido!')

      } else {
        const res = await fetch("http://localhost:1337/register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userName,
            firstName,
            lastName,
            email,
            password
          })
        })
        const data = await res.json()
        alert(`Cadastro efetuado com sucesso. Bem vindo(a) ${firstName}!`)
        localStorage.setItem('token', data.token)
        goToHome()
      }

    } catch (err) {
      console.log(err.message)
      if (err.message.includes("Email already exists")) {
        alert('E-mail já cadastrado!')

      } else if (err.message.includes("Password must have at least 6 characters")) {
        alert('Sua senha deve conter mais que 6 digitos!')

      } else if (err.message.includes("Submit all fields for registration")) {
        alert('Preencha todos os campos!')

      } else if (err.message.includes("UserName")) {
        alert('Nome de usuário já está em uso!')
      }
    }
  }

  return (
    <div>
      <Header btn1={'Cadastrar'} btn2={"Login"} route1={goToRegister} route2={goToLogin} firstName={firstName} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <DonutSmallIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastrar
          </Typography>
          <form className={classes.form} noValidate onSubmit={registerUser}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="component-outlined">Nome*</InputLabel>
                  <OutlinedInput id="firstName"
                    value={firstName}
                    name="firstName"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    label="Nome" />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="component-outlined">Sobrenome*</InputLabel>
                  <OutlinedInput id="lastName"
                    value={lastName}
                    name="lastName"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                    label="Sobrenome" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="component-outlined">Nome de usuário*</InputLabel>
                  <OutlinedInput id="userName"
                    value={userName}
                    name="userName"
                    required
                    onChange={(e) => setUserName(e.target.value)}
                    label="Nome de usuário" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="component-outlined">E-mail*</InputLabel>
                  <OutlinedInput id="email"
                    name="email"
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    label="E-mail" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="component-outlined">Senha*</InputLabel>
                  <OutlinedInput id="password"
                    type="password"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Senha" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="privacyPolicies" color="primary" />}
                  label="Concordo com as Politicas de Privacidade"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Cadastrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={goToLogin} variant="body2">
                  Já tem uma conta? Login
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
