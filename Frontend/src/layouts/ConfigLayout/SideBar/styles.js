import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f9fafb;
  border-right: 1px solid #ced4da;
  top: 0;
  left: 0;
  z-index: 2;
  min-width: 280px;
  //width: 20%;
  align-items: center;
  span.navbar-brand {
    margin-top: 20px;
    font-size: 24px;
  }
`;

export const ConfigList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-top: 30px;
  width: 100%;
`;

export const Config = styled.li`
  padding: 10px;
  width: 100%;
  text-align: center;
  background-color: ${(props) =>
    props.active ? props.theme.colors.background_4 : "transparent"};
  border: 1px solid
    ${(props) => (props.active ? props.theme.colors.border : "transparent")};
  a {
    font-size: 18px;
    font-weight: ${(props) => (props.active ? "bold" : "regular")};
    text-decoration: none;
    color: ${(props) => props.theme.colors.text};
  }
`;