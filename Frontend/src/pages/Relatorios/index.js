import React from "react";

import { ReportButton, Container, BoxContainer } from "./styles";

function Relatorios(props) {
  const { title = "" } = props;
  return (
    <Container className="container">
      <h1 className="title-center">{title}</h1>
      
      <BoxContainer>
          <ReportButton className="btn" href="/relatorios/anuidade" delay={200}>
            <img src={require("./assets/audit-bro.svg")} alt="relatório" />
            Relatório de recolhimento de anuidade
          </ReportButton>
          <ReportButton className="btn" href="/relatorios/caixa" delay={500}>
            <img src={require("./assets/audit-amico.svg")} alt="relatório" />
            Relatório de compra e venda
          </ReportButton>
        </BoxContainer>
    </Container>
  );
}

export default Relatorios;
