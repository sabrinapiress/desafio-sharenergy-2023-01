import { Container} from '@material-ui/core';
import React from 'react';
import { useProtectedPage } from '../../hooks/useProtectPage';
import Header from '../../components/Header/Header';
import { goToHome } from '../../Router/Router';
import { logOut } from '../../hooks/logOut';
import { useStyles } from "./styled"
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CrudForm from '../../components/CrudForm/CrudForm';
import TableUserList from '../../components/TableUserList/TableUserList';
import { useGlobal } from '../../global/GlobalContext';
import AddIcon from '@material-ui/icons/Add';
import ListAltIcon from '@material-ui/icons/ListAlt';

export default function CrudPage() {
    const classes = useStyles();

    const { states, setters } = useGlobal();

    useProtectedPage()

    const changeComponent = async () => {
        setters.setShowComponent(prev => !prev)
    }

    return (
        <div>
            <Header btn1={'HOME'} btn2={"Sair"} routeHome={goToHome} route2={logOut} />
            <Container className={classes.paper}>
                {states.showComponent ?
                    <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group" variant="contained">
                        <Button onClick={changeComponent} style={{fontWeight:"bold"}}>Usuários <><ListAltIcon/></></Button>
                        <Button onClick={changeComponent} style={{fontWeight:"bold"}} disabled>Novo Cadastro <><AddIcon/></></Button>
                    </ButtonGroup>
                    :
                    <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group" variant="contained">
                        <Button onClick={changeComponent} style={{fontWeight:"bold"}} disabled>Usuários <><ListAltIcon/></></Button>
                        <Button onClick={changeComponent} style={{fontWeight:"bold"}}>Novo Cadastro <><AddIcon/></></Button>
                    </ButtonGroup>}
                <div className={classes.componetDiv} >
                    {states.showComponent ?
                        <CrudForm title={"CADASTRO"}/> :
                        <TableUserList />}
                </div>
            </Container>
        </div>
    );
}

