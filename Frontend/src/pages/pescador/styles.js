import styled from "styled-components";
import { ScaleMacAnimation } from "../../styles/animations";

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
    .title-center {
      text-align: center;
      position: static;
      transform: none;
      font-size: 24px;
      margin-bottom: 40px;
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
