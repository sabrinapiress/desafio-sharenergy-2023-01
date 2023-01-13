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
        marginTop: 25

    },
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        border: `2px solid #CFCFCF`,
        paddingTop: 10,
        width: 500,
        backgroundColor: theme.palette.background.paper,
    },
    smalldemo:{
        border: `2px solid #CFCFCF`,
        paddingTop: 10,
        width: 200,
        backgroundColor: theme.palette.background.paper,
    }
}));