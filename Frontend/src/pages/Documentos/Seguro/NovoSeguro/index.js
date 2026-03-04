import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import DocumentoConteudo from "./DocumentoConteudo";
import { ContainerButton } from "./styles";

export default function ShowSeguro() {
  const contentRef = useRef(null);

  const reactToPrintFn = useReactToPrint({ 
    content: () => contentRef.current?.printRef
  });

  const gerarSeguro = async (e) => {
    e.preventDefault();

    if (contentRef.current && contentRef.current.handleSave) {
      const result = await contentRef.current.handleSave();
      
      if (result) {
        reactToPrintFn();
      }
    }
  };

  return (
    <div>
      <DocumentoConteudo ref={contentRef}/>
      <ContainerButton className="no-print">
        <button onClick={gerarSeguro}>Gerar o seguro</button>
      </ContainerButton>
    </div>
  );
}