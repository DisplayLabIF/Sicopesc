import styled from "styled-components";
import { ScaleMacAnimation } from "../../styles/animations";

export const Container = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 100px;
  height: calc(100% - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 90%;
  flex-direction: column;
  top: 0;
  left: 0;
  padding-bottom: 100px;
  

  .row {
    width: 100%;
    justify-content: center;
  }

  h1 {
    font-size: 56px;
    margin-bottom: 60px;
    animation: ${ScaleMacAnimation} 500ms;
    animation-fill-mode: backwards;
  }

  .btn {
    width: 100%;
    max-width: 300px;
    height: 180px;
    font-size: 22px;
    font-weight: 600;
    padding: 20px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: 0.2s ease-in-out;
  }

  .btn:hover {
    transform: translateY(-4px);
  }

  /*Mobile */
  @media (max-width: 768px) {
    padding: 20px 10px;

    h1 {
      font-size: 26px;
      margin-bottom: 30px;
    }

    .btn {
      max-width: 100%;
      height: 90px;
      font-size: 16px;
      border-radius: 10px;
    }
  }
`;

export const ButtonAction = styled.button`
  animation: ${ScaleMacAnimation} 500ms;
  animation-fill-mode: backwards;
  animation-delay: ${(props) =>
    props.delay ? props.delay + "ms" : "600ms"};
`;