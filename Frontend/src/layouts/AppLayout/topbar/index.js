import React, { useState } from "react";
import { FaUser, FaBars, FaDoorOpen } from "react-icons/fa";
//import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container } from "./styles";
import { useAppLayout } from "../../../contexts/AppLayoutContext";
import api from "../../../services/api";

export default function Topbar({ title = "" }) {
  //const dispatch = useDispatch();
  const [toLogin, setToLogin] = useState(false);
  const userName = localStorage.getItem("user_name");
  const layoutContext = useAppLayout();

  /*function toggleSidebar(e) {
    e.preventDefault();
    dispatch({ type: "TOGGLE_SIDEBAR" });
  }*/

  async function signoff() {
    const refresh_token = localStorage.getItem("refresh_token");

    if (refresh_token) {
      try {
        await api.post("/users/logout", { refresh_token });
      } catch (error) {
        console.error("Erro ao deslogar:", error);
      }
    }

    localStorage.removeItem("entidade_id");
    localStorage.removeItem("_token");
    localStorage.removeItem("USER_ROLE");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_name");

    setToLogin(true);
  }

  if (toLogin) {
    return <Redirect to="/login" />;
  }

  function onMenuClick(e) {
    e.preventDefault();
    layoutContext.toggleShowSidebar();
  }

  return (
    <Container className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand" onClick={onMenuClick}>
          <FaBars />
        </span>
        
        <div className="dropdown">
          <div
            className="user dropdown-toggle"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="me-auto"></div>
            <a href="#!">{userName?.split(" ")[0]}</a>
            <FaUser />
          </div>

          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <button className="dropdown-item" onClick={signoff}>
                <FaDoorOpen style={{ marginRight: 5 }} /> Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
