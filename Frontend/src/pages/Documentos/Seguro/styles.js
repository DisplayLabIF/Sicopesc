import styled from "styled-components";
import { ScaleMacAnimation } from "../../../styles/animations";

export const Container = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  position: absolute;

  form {
    animation: ${ScaleMacAnimation} 400ms;
    animation-fill-mode: backwards;
  }
  .btn {
    animation: ${ScaleMacAnimation} 400ms;
    animation-delay: 200ms;
    animation-fill-mode: backwards;
  }
  .table {
    animation: ${ScaleMacAnimation} 400ms;
    animation-delay: 500ms;
    animation-fill-mode: backwards;
  }
  .animate {
    animation: fade 400ms;
    animation-fill-mode: backwards;
    animation-delay: 400ms;
  }
  .table-rounded {
    border-radius: 5px;
  }
  .btn-action {
    margin-right: 8px;
  }
  
  @media (max-width: 768px) {
    font-size: 12px;
    th:nth-child(1),
    td:nth-child(1) {
      display: none;
    }
    .rest-name {
      display: none;
    }
    
    .btn-action {
      width: 40px;
      height: 30px;
      margin-left: 8px;
    }
  }
`;

export const PaginationInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

export const DocButton = styled.button`
  width: 50px;
  height: 5px;
  margin-left: 10px;
`;