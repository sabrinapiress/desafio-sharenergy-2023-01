import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Avatar, Button } from '@material-ui/core';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import DrawerNavigate from '../Drawer/Drawer';
import { Grid } from '@material-ui/core';
import { useStyles } from "./styled"

export default function Header({ btn1, btn2, route1, route2, routeHome, firstName }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">

                {!route1
                    ?
                    <Grid container
                        direction="row-reverse"
                        justifyContent="space-between"
                        alignItems="center">
                        <Grid>
                            <Toolbar>
                                <Avatar className={classes.logo}>
                                    <DonutSmallIcon />
                                </Avatar>
                                <Typography className={classes.title} variant="h6" noWrap onClick={routeHome}>
                                    SHARENERGY
                                </Typography>
                            </Toolbar>
                        </Grid>
                        <Typography className={classes.title} variant="h6"  onClick={routeHome}>
                            {firstName}
                        </Typography>
                        <DrawerNavigate route2={route2} />
                        
                    </Grid>
                    :
                    <Grid container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center">
                        <Grid>
                            <Toolbar>
                                <Avatar className={classes.logo}>
                                    <DonutSmallIcon />
                                </Avatar>
                                <Typography className={classes.title} variant="h6" noWrap onClick={routeHome}>
                                    SHARENERGY
                                </Typography>
                            </Toolbar>
                        </Grid>
                        <div className={classes.btnHeader}>
                            <div>
                                <Button variant="outlined" onClick={route2} color="inherit">{btn2}</Button>
                            </div>
                            <div>
                                <Button color="inherit" onClick={route1} >{btn1}</Button>
                            </div>
                        </div>
                    </Grid>}
            </AppBar>
        </div >
    );
}





