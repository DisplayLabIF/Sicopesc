import styled from "styled-components";
import { ScaleMacAnimation } from "../../../../styles/animations";

export const Container = styled.div`
  form {
    animation: ${ScaleMacAnimation} 400ms;
    animation-fill-mode: backwards;
  }
  .btn {
    animation: ${ScaleMacAnimation} 400ms;
    animation-delay: 200ms;
    animation-fill-mode: backwards;
  }
  .btn-action{
    width: 60px;
    height: 50px;
    margin-left: 10px;
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
  @media (max-width: 768px) {
    font-size: 12px;

    .title-center {
      text-align: center;
      position: static;
      transform: none;
      font-size: 24px;
      margin-bottom: 40px;
    }

    th:nth-child(1),
    td:nth-child(1) {
      display: none;
    }
    
    .btn {
      width: 40px;
      height: 30px;
      margin-left: 8px;
    }
    /* Exibir apenas primeiro nome */
    .col-nome .rest-name {
      display: none;
    }
  }
`;
export const FormSearch = styled.form`
  display: flex;
  width: 40%;
  align-items: center;
  margin-left: 20px;
  input {
    &::placeholder {
      color: #fff;
    }
  }
`;

export const PaginationInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;
