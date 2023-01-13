import React from 'react';
import { useProtectedPage } from '../../hooks/useProtectPage';
import Header from '../../components/Header/Header';
import { goToHome } from '../../Router/Router';
import { logOut } from '../../hooks/logOut';

export default function CrudPage() {

    useProtectedPage()

    return (
        <div>
            <Header btn1={'HOME'} btn2={"Sair"} routeHome={goToHome} route2={logOut} />
            CRUD
        </div>
    );
}

