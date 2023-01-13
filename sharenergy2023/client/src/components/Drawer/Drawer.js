import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { useStyles } from "./styled"
import HomeIcon from '@material-ui/icons/Home';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import { goToCrud, goToHome, goToHttpCat, goToRandomDog } from '../../Router/Router';

export default function DrawerNavigate({ route2 }) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerOpen}
                    className={clsx(open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <ListItem button key={"HTTP Cat"} onClick={goToHome}>
                        <ListItemIcon> <HomeIcon /></ListItemIcon>
                        <ListItemText primary={"Inicio"} />
                    </ListItem>
                <Divider />
                <List>
                    <ListItem button key={"HTTP Cat"} onClick={goToHttpCat}>
                        <ListItemIcon> <ChromeReaderModeIcon /></ListItemIcon>
                        <ListItemText primary={"HTTP Cat"} />
                    </ListItem>
                    <ListItem button key={"Random Dog"} onClick={goToRandomDog}>
                        <ListItemIcon> <ChromeReaderModeIcon /></ListItemIcon>
                        <ListItemText primary={"Random Dog"} />
                    </ListItem>
                    <ListItem button key={"CRUD"} onClick={goToCrud}>
                        <ListItemIcon> <ChromeReaderModeIcon /></ListItemIcon>
                        <ListItemText primary={"CRUD"} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button key={"Sair"} onClick={route2}>
                        <ListItemIcon> <MeetingRoomIcon /></ListItemIcon>
                        <ListItemText primary={"Sair"} />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}
