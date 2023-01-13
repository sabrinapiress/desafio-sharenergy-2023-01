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
    newUserBtn: {
        borderRadius: 5
    },
    avatar: {
      width: 300,
      height: 300
    },
  }));