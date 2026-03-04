import styled from "styled-components";

export const Container = styled.div``;

export const ReportStatusContainer = styled.div`
  height: 189px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  
  @media (max-width: 768px) {
    height: auto;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 12px;
    padding: 15px;
  }
`;

export const ReportStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  label {
    font-size: 20px;
  }
  span {
    font-size: 14px;
    font-weight: bold;
  }
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 12px 16px;
    min-height: unset;
    max-width: unset;
 
    label {
      font-size: 16px;
      margin-bottom: 0;
    }
    span {
      font-size: 15px;
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.primary};
  flex-direction: column;
  font-size: 18px;
  font-weight: bold;
  span {
    margin-bottom: 5px;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 15px;
  > div {
    margin-right: 10px;
  }
  @media (max-width: 768px) {
    justify-content: space-between;
    flex-direction: row;

    > div {
      margin-right: 0;
      width: 45%;
    }
  }
`   

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;

  table {
    width: 100%;
  }
  .btn-action {
    width: 120px;
    height: 50px;
  }

  @media (max-width: 768px) {
    th:nth-child(1),
    td:nth-child(1),
    th:nth-child(3),
    td:nth-child(3) {
      display: none;
    }

    /* Mostra só primeiro nome */
    .col-nome .rest-name {
      display: none;
    }
    .btn-action {
      width: 80px;
      height: 40px;
    }
    .btn-text {
      display: none;
    }
  }
`
