import styled from "styled-components";
import { ScaleMacAnimation } from "../../styles/animations";

export const Container = styled.div`
  
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
  }
`;

export const ReportButton = styled.a`
  width: 45% !important;
  height: 150px !important;
  font-size: 1.2em;
  position: relative;
  background: #fefefe;
  border: 1px solid rgba(0, 0, 0, 0.2);
  animation: ${ScaleMacAnimation} 400ms;
  animation-delay: ${(props) => (props.delay ? props.delay : 0)}ms;
  animation-fill-mode: backwards;
  img {
    position: relative;
    left: 0px;
    max-width: 136px;
    max-height: 100%;
    margin-right: 5px;
  }

  @media (max-width: 768px) {
    width: 100% !important;
    max-width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    font-size: 1em;
    height: 120px;;

    img {
      max-width: 90px;
      margin-right: 10px;
    }
  }
`;

export const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`
