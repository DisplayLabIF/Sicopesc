import React from "react";
import { Container, Wrapper } from "./styles";
import { ButtonAction } from "../main/styles";

export default function Documentos(props) {
  return (
    <Container>
      <Wrapper>
        <h1 className="text-center">O que deseja fazer?</h1>
        <div className="row">
          <div className="col-md-3 col-sm-12 d-flex justify-content-center mb-3">
            <ButtonAction
              delay={600}
              className="btn btn-primary"
            >
              CARTEIRINHA
            </ButtonAction>
          </div>
          <div className="col-md-3 col-sm-12 d-flex justify-content-center mb-3">
            <ButtonAction
              delay={700}
              className="btn btn-primary"
            >
              RGP <br/>
                REGISTRO GERAL DO PESCADOR
            </ButtonAction>
          </div>
          <div className="col-md-3 col-sm-12 d-flex justify-content-center mb-3">
              <ButtonAction
                delay={800}
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => props.history.push(`/documentos/seguro`)}
              >
                REQUERIMENTO SEGURO DEFESO
              </ButtonAction>
          </div>
          <div className="col-md-3 col-sm-12 d-flex justify-content-center">
            <ButtonAction
              delay={900} 
              className="btn btn-primary"
            >
              TERMO DE REPRESENTAÇÃO
            </ButtonAction>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
} 