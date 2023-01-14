import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { useStyles } from "./styled"
import { FormControl, Grid, InputLabel, OutlinedInput } from '@material-ui/core';
import { useGlobal } from '../../global/GlobalContext';

export default function CrudForm({ title, handleClose }) {
  const classes = useStyles();
  
  const token = localStorage.getItem('token')

  const { states, setters } = useGlobal();

  useEffect(() => {
  }, []);

  const createUser = async (event) => {
    try {
      event.preventDefault()
      if (!states.email.includes("@")) {
        alert(`Email inválido!`)

      } else if (states.name && states.cellphone && states.cpf && states.address && states.email) {

        await fetch("http://localhost:1337/crud/register", {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
            'Authorization': token
          },
          body: JSON.stringify({
            name: states.name,
            cellphone: states.cellphone,
            cpf: states.cpf,
            address: states.address,
            email: states.email
          })
        })
        alert(`Novo usuário ${states.name} cadastrado!`)
        setters.setShowComponent(prev => !prev)
      } else {
        alert(`Preencha todos os campos!`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const editUser = async (event) => {
    try {
      event.preventDefault()
      if (!states.email.includes("@")) {
        alert(`Email inválido!`)
      } else if (states.name && states.cellphone && states.cpf && states.address && states.email) {
        const res = await fetch(`http://localhost:1337/crud/byId?id=${states.id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({
            name: states.name,
            cellphone: states.cellphone,
            cpf: states.cpf,
            address: states.address,
            email: states.email
          })
        })
        await res.json();
        console.log(res)
        handleClose()
        
      } else {
        alert(`Preencha todos os campos!`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const body = (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="component-outlined">Nome*</InputLabel>
            <OutlinedInput id="component-outlined"
              value={states.name}
              name="name"
              required
              onChange={(e) => setters.setName(e.target.value)}
              label="Nome" />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="component-outlined">E-mail*</InputLabel>
            <OutlinedInput id="component-outlined"
              name="email"
              type="email"
              value={states.email}
              required
              onChange={(e) => setters.setEmail(e.target.value)}
              label="E-mail" />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="component-outlined">CPF*</InputLabel>
            <OutlinedInput id="component-outlined"
              value={states.cpf}
              name="cpf"
              type="number"
              required
              onChange={(e) => setters.setCpf(e.target.value)}
              label="CPF" />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="component-outlined">Telefone*</InputLabel>
            <OutlinedInput id="component-outlined"
              type="number"
              required
              name="cellphone"
              value={states.cellphone}
              onChange={(e) => setters.setCellphone(e.target.value)}
              label="Telefone*" />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="component-outlined">Endereço*</InputLabel>
            <OutlinedInput id="component-outlined"
              value={states.address}
              name="address"
              required
              onChange={(e) => setters.setAddress(e.target.value)}
              label="Endereço*" />
          </FormControl>
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        {title}
      </Button>
    </div>
  )

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography color='primary' className={classes.title} component="h1" >CRUD - {title}</Typography>
        {title === "CADASTRO" ?
          <form className={classes.form} noValidate onSubmit={createUser}>
            {body}
          </form>
          :
          <form className={classes.form} noValidate onSubmit={editUser}>
            {body}
          </form>
        }
      </div>
    </Grid>
  );
}
