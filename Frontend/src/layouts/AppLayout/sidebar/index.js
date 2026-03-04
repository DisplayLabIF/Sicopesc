import React, { useCallback, useEffect, useState } from "react";
import { Container, Item, CloseButton } from "./styles";
import { FaHome, FaChartBar, FaUser, FaTimes } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useAppLayout } from "../../../contexts/AppLayoutContext";
import api from "../../../services/api";
import useTheme from "../../../hooks/useTheme";

export default function Sidebar() {
  const appContext = useAppLayout();
  const location = useLocation();
  const [hideAnimation, setHideAnimation] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem("USER_ROLE"));

  function hideSidebar(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    appContext.toggleShowSidebar();
  }

  useEffect(() => {
    if (!userRole) {
      api.get("/user-logged").then((response) => {
        localStorage.setItem("USER_ROLE", response.data.role);
        setUserRole(response.data.role);
      });
    }
  }, [userRole]);

  const { isDarkMode } = useTheme();

  return (
    <Container
      hideAnimation={hideAnimation}
      show={appContext.showSidebar}
      onClick={hideSidebar}
    >
      <div className="sidebar" onClick={(e) => e.stopPropagation}>
        <CloseButton onClick={hideSidebar} aria-label="Fechar menu">
          <FaTimes />
        </CloseButton>
        <div className="brand primary">
          <span className="title white-text">
            <img
              src={isDarkMode ?  require("../../../assets/logo-branca.png") : require("../../../assets/logo-dark.png")}
              alt="logo siscol"
              style={{ maxWidth: 150, maxHeight: 100 }}
            />
          </span>
        </div>

        <ul>
          <li>
            <Item active={location.pathname === "/inicio"}>
              <Link to="/inicio">
                <FaHome size={14} style={{ marginRight: 8 }} />
                <span> Início</span>
              </Link>
            </Item>
          </li>

          {userRole === "ADMIN" && (
            <li>
              <Item>
                <Link to="/usuarios">
                  <FaUser size={14} style={{ marginRight: 8 }} />
                  <span>Gerenciar usuários</span>
                </Link>
              </Item>
            </li>
          )}

          <li>
            <Item>
              <Link to="/relatorios">
                <FaChartBar size={14} style={{ marginRight: 8 }} />
                <span>Relatórios</span>
              </Link>
            </Item>
          </li>
          <li>
            <Item active={location.pathname === "/documentos"}>
              <Link to="/documentos">
                <IoDocumentTextOutline size={14} style={{ marginRight: 8 }} />
                <span>Documentos</span>
              </Link>
            </Item>
          </li>
        </ul>
      </div>
    </Container>
  );
}
