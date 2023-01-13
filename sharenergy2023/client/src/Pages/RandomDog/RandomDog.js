import { Container,Typography } from '@material-ui/core';
import React from 'react';
import { useProtectedPage } from '../../hooks/useProtectPage';
import Header from '../../components/Header/Header';
import { goToHome } from '../../Router/Router';
import { logOut } from '../../hooks/logOut';
import { useStyles } from "./styled"
import CardRandomDog from '../../components/CardRandomDog/CardRandomDog';

export default function RandomDog() {
    const classes = useStyles();

    useProtectedPage()

    return (
        <div>
            <Header btn1={'HOME'} btn2={"Sair"} routeHome={goToHome} route2={logOut} />
            <Container className={classes.paper}>
                <Typography color='primary' className={classes.title} component="h1" >RANDOM DOG</Typography>
                <CardRandomDog/>
            </Container>
        </div>
    );
}

