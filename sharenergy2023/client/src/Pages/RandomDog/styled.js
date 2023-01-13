const { makeStyles } = require("@material-ui/core");

export const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        marginBottom: 10,
        
    }
}));