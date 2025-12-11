import React from "react";
import { Config, ConfigList, Container } from "./styles";
import { FaAngleLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";

// import { Container } from './styles';

function SideBar(props) {
  const location = useLocation();
  return (
    <Container>
      <span
        className="navbar-brand"
        onClick={() => props.history.push("/inicio")}
      >
        <FaAngleLeft size={40} style={{ marginRight: 5 }} /> Voltar
      </span>
      <ConfigList>
        <Config active={location.pathname === "/configs"}>
          <a href="/configs">Configurações gerais</a>
        </Config>
        <Config active={location.pathname === "/configs-usuario"}>
          <a href="/configs-usuario">Configurações de usuário</a>
        </Config>
        <Config active={location.pathname === "/configs-colonia"}>
          <a href="/configs-colonia">Configurações da colônia</a>
        </Config>
      </ConfigList>
    </Container>
  );
}

export default SideBar;