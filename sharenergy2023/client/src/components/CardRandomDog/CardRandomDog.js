import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AutorenewIcon from '@material-ui/icons/Autorenew'
import { useStyles } from "./styled"
import PetsIcon from '@material-ui/icons/Pets';

export default function CardRandomDog() {
    const classes = useStyles();
    const [favorite, setFavorite] = useState(false);
    const [dog, setDog] = useState('')
    const [loading, setLoading] = useState(false);

    const addFavorite = () => {
        setFavorite(!favorite);
    };

    useEffect(() => {
        getDog()
      }, [])

    const getDog = async () => {
        setLoading(true)
        await fetch("https://random.dog/woof.json")
            .then((res) => res.json())
            .then((data) => {
                setDog(data.url)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Card className={classes.root}>
            {dog ?
             <> {loading === false?
              <Avatar alt={dog} src={dog} aria-label="dog image" className={classes.avatar} /> 
              : 
              <img style={{ width: 80 }} alt='loading gif' src={"https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"}></img> }</> 
              :
              <Avatar aria-label="not found image" className={classes.avatar} src={'https://neilpatel.com/wp-content/uploads/2019/05/ilustracao-de-pagina-de-erro-web.jpeg'}></Avatar>}
            <CardContent>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={addFavorite}>
                    {favorite ? <PetsIcon aria-label="icon animal" color={'secondary'} /> : <PetsIcon />}
                </IconButton>
                    <IconButton className={classes.newUserBtn} aria-label="new user" onClick={getDog}>
                        <AutorenewIcon /> <Typography component="p"> Outro Cachorrinho </Typography>
                    </IconButton>
            </CardActions>
        </Card>
    );
}