import styled from "styled-components";

export const Container = styled.div`
  width: 781px;
  margin: 0px auto;
  background: #ffffff;

  table.guia img {
    display: block;
    position: absolute;
    width: 110px;
    height: 120px;
    margin-left: 20px;
    margin-top: 10px;
  }
  table.guia {
    border-spacing: 0px;
    margin: 0px auto;
    margin-bottom: 20px;
  }
  table.guia td {
    font-size: 11pt;

    border: 1px solid black;
    width: 50%;
  }
  table.guia td.cabecalho {
    text-align: center;
  }
  table.guia th {
    border: 1px solid black;
  }
  table.guia td.banco {
    padding-bottom: 50px;
  }
  table.guia span.data {
    margin-left: 392px;
  }
  table.guia span.end {
    position: absolute;
    margin-left: 3px;
  }
  table.guia span.autentica {
    position: relative;
    font-size: 10pt;
    top: 50px;
    right: 300px;
  }
  td {
    padding: 12px 0;
  }
button.btn-guia {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
}
  button.btn-guia:hover {
    background: #27c49f;
    border-color: #27c49f;
  }
  @media print {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: auto;
    background-color: white;
    .btn-guia {
      display: none;
    }
    table.guia img {
      width: 78px !important;
      height: 100px !important;
      margin-left: 20px;
      margin-top: 10px;
    }
    table.guia span.autentica {
      position: relative;
      font-size: 10pt;
      top: 50px;
      right: 300px;
    }
    table.guia span.data {
      margin-left: 320px;
    }
  }
`;
