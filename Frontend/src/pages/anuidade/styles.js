import styled from "styled-components";
import { ScaleMacAnimation } from "../../styles/animations";

export const Container = styled.div`
  .card {
    animation: ${ScaleMacAnimation} 400ms;
    animation-delay: 400ms;
    animation-fill-mode: backwards;
  }
  .table {
    animation: ${ScaleMacAnimation} 400ms;
    animation-delay: 800ms;
    animation-fill-mode: backwards;
  }
  .title-center {
    left: 50%;
    transform: translateX(-50%);
    top: 34px;
    position: absolute;
    font-size: 2.2em;
  }
  @media (max-width: 768px) {
    .title-center {
      text-align: center;
      position: static;
      transform: none;
      font-size: 24px;
      margin-bottom: 40px;
    }
    .table {
      width: 600px;
      min-width: 100%;  
    }
  }
`;
export const FormSearch = styled.form`
  animation: ${ScaleMacAnimation} 400ms;
`;
