import styled from 'styled-components';

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
      /* Esconde email no mobile */
      .col-email {
        display: none;
      }

      /* Mostra só primeiro nome */
      .rest-name {
        display: none;
      }

      table {
        font-size: 14px;
      }

      .col-acoes {
        gap: 5px;
      }
    }
  }
`;
