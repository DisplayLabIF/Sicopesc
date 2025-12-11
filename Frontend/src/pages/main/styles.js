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
  
  h1 {
    font-size: 72px;
    margin: 0px 0 80px 0;
    animation: ${ScaleMacAnimation} 500ms;
    animation-fill-mode: backwards;
  }
    
  .btn {
    width: 100%;
    max-width: 320px;
    height: 180px;
    font-size: 28px;
    font-weight: bold;
    padding: 24px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 24px;
      margin: 0 0 40px 0;
    }
    .btn {
      font-size: 18px;
      height: 80px;
      width: 80%;
    }
  }
`;

export const ButtonAction = styled.button`
  animation: ${ScaleMacAnimation} 500ms;
  animation-fill-mode: backwards;
  animation-delay: ${(props) => (props.delay ? props.delay + "ms" : "600ms")};
`;
