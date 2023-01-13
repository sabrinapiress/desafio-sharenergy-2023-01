import { Container, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useProtectedPage } from '../../hooks/useProtectPage';
import Header from '../../components/Header/Header';
import { goToHome } from '../../Router/Router';
import { logOut } from '../../hooks/logOut';
import CardUser from '../../components/CardUser/CardUser';
import { useStyles } from "./styled"

export default function Home() {
    const classes = useStyles();
    const [nameUser, setNameUser] = useState('')
    const [avatarUser, setAvatarUser] = useState('')
    const [emailUser, setEmailUser] = useState('')
    const [username, setUsername] = useState('')
    const [ageUser, setAgeUser] = useState('')

    useProtectedPage()

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const res = await fetch("https://randomuser.me/api/")
        const data = await res.json()
        if (data) {
            setNameUser(data.results[0].name.first + " " + data.results[0].name.last)
            setEmailUser(data.results[0].email)
            setAvatarUser(data.results[0].picture.large)
            setUsername(data.results[0].login.username)
            setAgeUser(data.results[0].dob.age)
        }
    }

    return (
        <div>
            <Header btn1={'HOME'} btn2={"Sair"} routeHome={goToHome} route2={logOut} />
            <Container className={classes.paper}>
                <Typography color='primary' className={classes.title} component="h1" >RANDOM USER API</Typography>
                <CardUser getUsers={getUsers} nameUser={nameUser} avatarUser={avatarUser} emailUser={emailUser} username={username} ageUser={ageUser} />
            </Container>
        </div>
    );
}

