import { Container, Typography } from '@material-ui/core';
import React, {useState } from 'react';
import { useProtectedPage } from '../../hooks/useProtectPage';
import Header from '../../components/Header/Header';
import { goToHome } from '../../Router/Router';
import { logOut } from '../../hooks/logOut';
import { useStyles } from "./styled"

export default function Home() {
    const classes = useStyles();
    const [nameUser, setNameUser] = useState('')
    const [avatarUser, setAvatarUser] = useState('')
    const [emailUser, setEmailUser] = useState('')
    const [username, setUsername] = useState('')
    const [ageUser, setAgeUser] = useState('')

    useProtectedPage()

    const getUsers = async () => {

    }

    return (
        <div>
            <Header btn1={'HOME'} btn2={"Sair"} routeHome={goToHome} route2={logOut} />
            <Container className={classes.paper}>
                <Typography color='primary' className={classes.title} component="h1" >RANDOM USER API</Typography>
               
            </Container>
        </div>
    );
}

