import styled from "styled-components";

export const Container = styled.nav`
  padding: 34px;
  background-color: ${(props) => props.theme.colors.background}!important;
  
  .navbar-brand {
    color: ${(props) => props.theme.colors.text};
    font-size: 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: none;
    background: none;
  }

  .container-fluid {
    padding: 0;
  }

  a {
    padding: 0;
  }

  .user {
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      margin-right: 13px;
      color: ${(props) => props.theme.colors.text};
      text-decoration: none;
    }
  }
  
  .dropdown-item {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.text};
  }

`;
