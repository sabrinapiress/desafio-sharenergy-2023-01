const { makeStyles } = require("@material-ui/core");

export const useStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    table: {
        width: 850
    },
    paper: {
        marginTop: 30
    },
    tablecell: {
        fontWeight: 'bolder'
    },
    papermodal: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    infos: {
        fontWeight: 'bolder'
    },
    btnedit: {
        backgroundColor: '#3CB371',
        color: '#fff',
        '&:hover': {
            backgroundColor: "#2E8B57",
        },
    },
    "@media (max-width: 960px)": {
        table: {
            width: 500
        },
        papermodal: {
            width: 400,
        },
    },

    "@media (max-width: 768px)": {
      smalltable:{
        width: 250
      },
      papermodal: {
        width: 400,
    },
    }
}));
