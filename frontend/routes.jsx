// Dependencies
import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

// Components
import Login from './login/index.jsx';
import Departamento from './departamento/index.jsx';

// layouts excomponents
import LayoutAdmin from './layoutComponents/LayoutAdmin.jsx';
import LayoutJefeDepartamento from './layoutComponents/LayoutJefeDepartamento.jsx';
import LayoutCandidatoAResidente from './layoutComponents/LayoutCandidatoAResidente.jsx';
import LayoutDocente from './layoutComponents/LayoutDocente.jsx';
import LayoutAsesorExterno from './layoutComponents/LayoutAsesorExterno.jsx';
import LayoutResidente from './layoutComponents/LayoutResidente.jsx';
import LayoutJefeDeDivisionDeEstudiosProfesionales from './layoutComponents/LayoutJefeDeDivisionDeEstudiosProfesionales.jsx';
import LayoutJefeDeGestionTecnologica from './layoutComponents/LayoutJefeDeGestionTecnologicaYVinculacion.jsx';
import LayoutEmpresaNueva from './layoutComponents/LayoutEmpresaNueva.jsx';
import LayoutEmpresa from './layoutComponents/LayoutEmpresa.jsx';
import Page404 from './layoutComponents/Page404.jsx';


const AppRoutes = () => 
            <Switch>
                <Route exact path="/usuario/auth" component={Login} />
                <LayoutAdmin path="/admin" />
                <LayoutJefeDepartamento path="/jefe_departamento"/>
                <LayoutJefeDeDivisionDeEstudiosProfesionales path="/jefe_Dep"/> 
                <LayoutJefeDeGestionTecnologica path="/jefe_gestion_tecnologica"/>
                <LayoutCandidatoAResidente path="/candidato_residente"/>
                <LayoutResidente path="/residente"/>                
                <LayoutDocente path="/docente"/>
                <LayoutAsesorExterno path="/asesor_externo"/>
                <LayoutEmpresaNueva path= "/nueva_empresa"/>
                <LayoutEmpresa path= "/empresa"/>
                <Route component={Page404} />
            </Switch>

export default AppRoutes;