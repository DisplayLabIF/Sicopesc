import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  .btn-action {
    width: 60px;
    height: 50px;
    margin-left: 8px;
  }

  @media (max-width: 768px) {
    font-size: 12px;

    th:nth-child(3),
    td:nth-child(3),
    th:nth-child(4),
    td:nth-child(4){
      display: none;
    }
    
    .btn-action {
      width: 50px;
      height: 30px;
    }
    .complete-name {
      display: none;
    }
`;

export const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 35px;
`;

export const ButtonHeader = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 238px !important;
  height: 62px !important;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  color: white;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    width: 160px !important;
    justify-content: space-between;
    font-size: 12px;
    height: 50px !important;
  }

`;
