import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import DocumentoConteudo from "./DocumentoConteudo";
import { ContainerButton } from "./styles";

export default function ShowSeguro() {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div>
      <DocumentoConteudo ref={contentRef}/>
      <ContainerButton>
        <button
          onClick={reactToPrintFn}
        >
          Imprimir Documento
        </button>
      </ContainerButton>

    </div>
  );
}