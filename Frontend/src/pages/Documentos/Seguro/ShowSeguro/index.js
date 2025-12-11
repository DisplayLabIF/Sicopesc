import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import DocumentoConteudo from "./DocumentoConteudo";

export default function ShowSeguro() {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div>
      <button
        onClick={reactToPrintFn}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          margin: "20px auto",
          display: "block",
          cursor: "pointer",
        }}
      >
        Imprimir Documento / Gerar PDF
      </button>

      <DocumentoConteudo ref={contentRef}/>
      
    </div>
  );
}