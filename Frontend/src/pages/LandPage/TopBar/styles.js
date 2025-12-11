import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
  margin-right: 20px;
  position: absolute;
  top: 0;
  right: 0;
`;

export const ButtonTopBar = styled.a`
  border: none;
  background: ${(props) =>
    props.active ? (props.lightMode ? `#fff` : "#4a4a4a") : "none"};
  color: ${(props) =>
    props.active
      ? props.lightMode
        ? props.theme.colors.secondary
        : "#fff"
      : props.lightMode
      ? "#fff"
      : "#4a4a4a"};
  border-radius: 10px;
  font-size: 20px;
  padding: 8px 15px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: ${(props) =>
      props.active
        ? props.lightMode
          ? props.theme.colors.secondary
          : "#fff"
        : props.lightMode
        ? "#fff"
        : "#4a4a4a"};
  }
`;

export const LogoSiscol = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 153px;
  height: 80px;
  margin-top: 20px;

  @media (max-width: 768px) {
    width: 70px;
    height: 40px;
    margin: 16px auto 8px auto;
    display: block;
  }
`;
