const { makeStyles } = require("@material-ui/core");

export const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    divmodal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    title: {
       textAlign: 'center',
       textTransform: "uppercase"
    },
    image: {
        maxWidth: 500
    },
    smallimage: {
        maxWidth: 200
    }
}));


