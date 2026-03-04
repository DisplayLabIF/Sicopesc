import styled from "styled-components";

export const Container = styled.div``;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 380px;
  height: 100%;
  .button-submit {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    button {
      width: 67px;
      height: 53px;
      font-size: 22px;
      border-radius: 10px;
      margin-right: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    .button-submit {
      justify-content: center;
      button {
        margin-right: 0;
      }
    }
  }
`;
