import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      minWidth: 340,
      paddingTop: 30,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    username: {
        fontWeight: 'bolder',
        textAlign: 'center',
        marginBottom: 15,
    },
    infos: {
        textAlign: 'center',
        marginBottom: 5
    },
    newUserBtn: {
        borderRadius: 5
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      width: 200,
      height: 200
    },
  }));