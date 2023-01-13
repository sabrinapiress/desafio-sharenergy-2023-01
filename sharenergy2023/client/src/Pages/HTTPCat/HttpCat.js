import { Container,  InputAdornment, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useProtectedPage } from '../../hooks/useProtectPage';
import Header from '../../components/Header/Header';
import { goToHome } from '../../Router/Router';
import { logOut } from '../../hooks/logOut';
import { useStyles } from "./styled"
import SearchIcon from '@material-ui/icons/Search';

export default function HTTPCat() {
    const classes = useStyles();
    const [code, setCode] = React.useState('');
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [search, setSearch] = useState("");
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
    }, []);

    useProtectedPage()
  
    return (
        <div>
            <Header btn1={'HOME'} btn2={"Sair"} routeHome={goToHome} route2={logOut} />
            <Container className={classes.paper}>
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    label="Buscar"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color='disabled' />
                            </InputAdornment>
                        ),
                    }}
                />
                <Typography color='primary' className={classes.title} component="h1">HTTP Cat API</Typography>
            </Container>
        </div>
    );
}
