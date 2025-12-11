import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import Main from "../pages/main";
import Pescador from "../pages/pescador";
import Erro404 from "../pages/erro/erro404";
import NovoPescador from "../pages/pescador/NovoPescador";
import Address from "../pages/pescador/NovoPescador/Address";
import FisherInfo from "../pages/pescador/FisherInfo";
import Login from "../pages/login";
import Register from "../pages/Register";
import RegisterResponsavel from "../pages/Register/Responsavel";
import RegisterEntidade from "../pages/Register/Entidade";
import PrivateRoute from "./PrivateRoute";
import Anuidade from "../pages/anuidade";
import ShowGuia from "../pages/anuidade/ShowGuia";
import Caixa from "../pages/Caixa";
import Venda from "../pages/Venda";
import Recibo from "../pages/Recibo";
import Users from "../pages/Users";
import NewUser from "../pages/Users/NewUser";
import LandPage from "../pages/LandPage";
import DividedRoute from "./DividedRoute";
import RegisterFinished from "../pages/Register/RegisterFinished";
import Relatorios from "../pages/Relatorios";
import RelatorioAnuidade from "../pages/Relatorios/Anuidade";
import RelatorioCaixa from "../pages/Relatorios/Caixa";
import ConfigRoute from "./ConfigRoute";
import Documentos from "../pages/Documentos";
import Seguro from "../pages/Documentos/Seguro";
import ShowSeguro from "../pages/Documentos/Seguro/ShowSeguro";

const Routes = () => (
  <Switch>
    <PrivateRoute 
      exact 
      path="/inicio" 
      component={Main} 
    />
    <DividedRoute
      exact
      path="/register"
      component={Register}
      description="Informe os dados para se cadastrar no sistema, Já tem cadastro? Então clique no botão abaixo para entrar."
      showBtnLogin={true}
    />
    <DividedRoute
      exact
      path="/register/responsavel"
      component={RegisterResponsavel}
      description="Informe os dados do representante da entidade"
    />
    <DividedRoute
      exact
      path="/register/entidade"
      component={RegisterEntidade}
      description="Informe os dados da entidade/colônia ao qual você representa"
    />
    <Route 
      exact 
      component={RegisterFinished} 
      path="/cadastro-finalizado" 
    />
    <Route 
      exact 
      path="/login" 
      component={Login} 
    />
    <PrivateRoute
      exact
      path="/pescador"
      title="Pescadores"
      component={Pescador}
    />
    <PrivateRoute 
      path="/pescador/:page" 
      component={Pescador} 
    />
    <PrivateRoute
      exact
      path="/editar-pescador/:id"
      title="Alterar pescador"
      component={NovoPescador}
    />
    <PrivateRoute
      exact
      path="/novo-pescador"
      title="Novo Pescador"
      component={NovoPescador}
    />
    <PrivateRoute
      exact
      path="/novo-pescador/endereco/:id"
      title="Endereço(s) do pescador"
      component={Address}
    />
    <PrivateRoute
      exact
      path="/ver-pescador/:id"
      title="Informações do pescador"
      component={FisherInfo}
    />
    <PrivateRoute
      exact
      path="/anuidade"
      title="Recolhimento de anuidade"
      component={Anuidade}
    />
    <PrivateRoute
      exact
      path="/ver-guia/:id"
      title="Guia de pagamento"
      component={ShowGuia}
    />
    <PrivateRoute
      exact
      path="/caixa"
      title="Compra e venda de pescado"
      component={Caixa}
    />

    <PrivateRoute
      exact
      path="/venda"
      title="Venda de Pescado"
      component={Venda}
      tipo_caixa="venda"
    />

    <PrivateRoute
      exact
      path="/compra"
      title="Compra de Pescado"
      component={Venda}
      tipo_caixa="compra"
    />

    <PrivateRoute
      exact
      path="/recibo/:id"
      title="Recibo"
      component={Recibo}
      tipo_caixa="compra"
    />

    <PrivateRoute 
      exact 
      path="/usuarios" 
      title="Usuários" 
      component={Users} 
    />
    <PrivateRoute
      exact
      path="/novo-usuario"
      title="Novo usuário"
      component={NewUser}
    />
    <PrivateRoute
      exact
      path="/editar-usuario/:id"
      title="Editar usuário"
      component={NewUser}
    />

    <PrivateRoute
      exact
      path="/relatorios"
      title="Relatórios"
      component={Relatorios}
    />

    <PrivateRoute
      exact
      path="/relatorios/anuidade"
      title="Relatório de anuidades"
      component={RelatorioAnuidade}
    />

    <PrivateRoute
      exact
      path="/relatorios/caixa"
      title="Relatório de Compra e venda de pescado"
      component={RelatorioCaixa}
    />
   
    <PrivateRoute
      exact
      path="/documentos"
      title="Documentos"
      component={Documentos}
    />

    <PrivateRoute
      exact
      path="/documentos/seguro"
      title="Requerimento Seguro Defeso"
      component={Seguro}
    />

    <PrivateRoute
      exact
      path="/documentos/seguro/exibir-seguro"
      title="Exibir Requerimento Seguro Defeso"
      component={ShowSeguro}
    />

    <Route
      exact
      path="/login"
      description="Bem vindo(a) ao SISCOL!"
      component={() => <Redirect to="/login" />}
    />

    <Route
      exact
      path="/"
      description="Bem vindo ao Sicopesc!"
      component={LandPage}
    />

    <ConfigRoute
      exact
      path="/configs"
      title="Configurações Gerais"
      component={RelatorioCaixa}
    />

    <PrivateRoute path="*" component={Erro404} />
  </Switch>
);

export default Routes;
