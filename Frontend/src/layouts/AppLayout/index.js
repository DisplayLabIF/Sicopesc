import React from "react";
import TopBar from "./topbar";
import Sidebar from "./sidebar";

import { Container } from "./styles";

import AppLayoutProvider from "../../contexts/AppLayoutContext";
import useTheme from "../../hooks/useTheme";

function Template({ children, title, history }) {
  const {isDarkMode} = useTheme();

  return (
    <AppLayoutProvider>
      <Sidebar />
      <Container>
        <TopBar title={title} />
        {children}
        <img
          id="logo-login"
          className="logo-bottom"
          src={isDarkMode ? require("../../assets/logo-branca.png") : require("../../assets/logo-dark.png")}
          alt="logo siscol"
        />
      </Container>
    </AppLayoutProvider>
  );
}

export default Template;
