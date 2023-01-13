const { makeStyles } = require("@material-ui/core");

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    logo: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        cursor: 'pointer'
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        cursor: 'pointer'
    },
    btnHeader: {
        marginRight: 10,
    },
    btnHeader:{
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 10,
    },
    btnDrawer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}));