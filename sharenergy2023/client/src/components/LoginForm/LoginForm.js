import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import Typography from '@material-ui/core/Typography';
import { FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import { goToRegister } from '../../Router/Router';
import { useStyles } from './styled';

export default function LoginForm({ email, password, loginUser, setPassword, setEmail }) {
  const classes = useStyles();

  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false)

  const setCookies = () => {
    const u = email
    const p = password

    setPersist(prev => !prev)
      document.cookie = "username=" + u + ";path=http://localhost/web6pm/"
      document.cookie = "userpass=" + p + ";path=http://localhost/web6pm/"
  }

  const getCookieData = () => {
    let user = getCookie('username')
    let pass = getCookie('userpass')

    setEmail(user)
    setPassword(pass)
  }

  function getCookie(cname){
    let name = cname + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(";")
    for(let i  = 0; i < ca.length; i++){
      let c = ca[i]
      while (c.charAt(0) == ' '){
        c = c.substring(1)
      }
      if(c.indexOf(name) == 0){
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }

  useEffect(() => {
    localStorage.setItem('persist', persist)
    getCookieData()
    
  }, [persist])

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.logo}>
            <DonutSmallIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Bem vindo!
          </Typography>
          <form className={classes.form} noValidate onSubmit={loginUser}>
            <Grid item xs={12} className={classes.input}>
              <FormControl variant="outlined" fullWidth >
                <InputLabel htmlFor="component-outlined" >E-mail ou nome de usuário*</InputLabel>
                <OutlinedInput id="component-outlined1"
                  name="email"
                  type="email"
                  autoComplete="current-email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  label="E-mail ou nome de usuário*" />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="component-outlined">Senha*</InputLabel>
                <OutlinedInput id="component-outlined"
                  type="password"
                  required
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Senha*" />
              </FormControl>
            </Grid>
            <FormControlLabel
              control={<Checkbox id='remember' value="remember" color="primary" onClick={setCookies} checked={persist} />}
              label="Lembrar-me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu sua senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={goToRegister}>
                  {"Não tem uma conta? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
}
