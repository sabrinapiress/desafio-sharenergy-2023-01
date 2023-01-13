import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from "./styled"

export default function CardUser({ getUsers, nameUser, avatarUser, emailUser, username, ageUser }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [favorite, setFavorite] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const addFavorite = () => {
        setFavorite(!favorite);
    };

    return (
        <Card className={classes.root}>
            <Avatar alt={nameUser} src={avatarUser} aria-label="recipe" className={classes.avatar} />
            <CardContent>
                <Typography className={classes.username} variant="body2" color="textPrimary" component="p">
                    @{username}
                </Typography>
                <Typography className={classes.infos} variant="body2" color="textSecondary" component="p">
                    {nameUser} -  {ageUser} anos
                </Typography>
                <Typography className={classes.infos} variant="body2" color="textSecondary" component="p">
                    {emailUser}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={addFavorite}>
                    {favorite ? <FavoriteIcon color={'secondary'} /> : <FavoriteIcon />}
                </IconButton>
                <IconButton className={classes.newUserBtn} aria-label="new user" onClick={getUsers}>
                    <AutorenewIcon /> <Typography component="p"> Novo Usuário </Typography>
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                        minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                        heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                        browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                        and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                        pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                        without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                        medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                        again without stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don’t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}