import styled from "styled-components";
import { ScaleMacAnimation } from "../../styles/animations";

export const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.background};
  flex-wrap: wrap;
  #logo-login {
    width: 220px;
    max-width: 60vw;
    height: auto;
    position: static;
    display: block;
    margin: 0 auto 24px auto;
  }
  padding: 24px 16px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    #logo-login {
      width: 180px;
      margin-bottom: 16px;
    }
    padding: 20px 12px;
  }
  @media (max-width: 480px) {
    #logo-login {
      width: 150px;
      margin-bottom: 12px;
    }
    padding: 16px 10px;
  }
`;

export const TextLogin = styled.h1`
  color: white;
  font-size: 24px;
  font-family: "Ubuntu", sans-serif;
  width: 45%;
  text-align: center;
  margin-right: 5%;
  font-weight: 400;
  animation-delay: 400ms;
  animation-fill-mode: backwards;
`;

export const LoginBox = styled.div`
  animation: ${ScaleMacAnimation} 500ms;
  animation-fill-mode: backwards;
  width: 100%;
  max-width: 420px;
`;

export const FooterBox = styled.div`
  display: flex;
  width: 100%;
  max-width: 380px;
  height: 70px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  box-shadow: 0 0 1px black;
  padding: 10px;
  margin-top: 20px;
  animation: ${ScaleMacAnimation} 300ms;
  animation-fill-mode: backwards;
  animation-delay: 500ms;
  background-color: ${(props) => props.theme.colors.background_5};
  span {
    font-size: 15px;
    text-align: center;
  }
  @media (max-width: 480px) {
    height: auto;
    padding: 12px;
    span { font-size: 14px; }
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 380px;
  height: 100%;
  gap: 8px;
  
  .input-group, .mb-4 { width: 100%; }
  .form-control { font-size: 16px; }
  .button-submit {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    button {
      width: 100%;
      height: 48px;
      font-size: 20px;
      border-radius: 10px;
      margin-right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
  }
  @media (max-width: 480px) {
    .form-control { font-size: 15px; }
    .button-submit button { height: 46px; font-size: 18px; }
  }
`;
