import { Container, Grid, InputAdornment, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useProtectedPage } from '../../hooks/useProtectPage';
import Header from '../../components/Header/Header';
import { goToHome } from '../../Router/Router';
import { logOut } from '../../hooks/logOut';
import { useStyles } from "./styled"
import PetsIcon from '@material-ui/icons/Pets';
import SearchIcon from '@material-ui/icons/Search';
import { httpCode } from '../../service/CodeList';
import ModalHttpCat from '../../components/ModalHttpCat/ModalHttpCat';

export default function HTTPCat() {
    const classes = useStyles();
    const [code, setCode] = React.useState('');
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [search, setSearch] = useState("");
    const [open, setOpen] = React.useState(false);

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);

    useProtectedPage()

    const handleListItemClick = (value, index) => {
        setCode(value)
        setSelectedIndex(index);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedIndex(1);
    };

    const filterCode = useMemo(() => {
        return httpCode
            .filter((value) => {
                const code = value.toLocaleLowerCase().includes(search)
                if (code) {
                    return value
                }
            })
    }, [search])

    function generate() {
        return filterCode.map((value) => {
            return (
                <ListItem button
                    key={value}
                    selected={selectedIndex === value}
                    onClick={(event) => handleListItemClick(value, value)}>
                    <ListItemIcon>
                        <PetsIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={`Code - ${value}`}
                    />
                </ListItem>
            )
        })
    }

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
                <Grid item xs={12} md={6}>
                    {matches && (
                        <div className={classes.demo}>
                            <List>
                                {generate()}
                            </List>
                        </div>)}
                    {!matches && (
                    <div className={classes.smalldemo}>
                        <List>
                            {generate()}
                        </List>
                    </div>)}
                </Grid>
            </Container>
            <ModalHttpCat open={open} handleClose={handleClose} code={code} />
        </div>
    );
}
