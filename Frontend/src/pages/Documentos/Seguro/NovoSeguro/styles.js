import styled from "styled-components";

export const Container = styled.div`
  width: 21cm;              /* largura do A4 */
  min-height: 29.7cm;       /* altura mínima do A4 */
  margin: 0 auto 1cm auto;  /* centraliza e dá espaço entre páginas */
  padding: 1cm;             /* margens internas */
  background: white;
  border: 1px solid #ccc;   /* borda leve */
  box-shadow: 0 0 5px rgba(0,0,0,0.1); /* sombra leve */
  box-sizing: border-box;
  color: black;

  /* ======== TABELA ============= */
  table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    font-size: 14px;
    table-layout: auto;
    border: none;
  }

  th,
  td {
    align: center;
    border: 1px solid #444;
    padding: 6px 8px;
    text-align: left;
    height: 25px;
  }

  th {
    text-align: center;
  }

  .bloco {
    width: 100%;
  }

  thead td {
    border: none;
    text-align: center;
  }

  th.section {
    text-align: left;
    border: none;
    font-weight: 700;
    font-size: 15px;
    padding-top: 24px;
  }

  .notes {
    font-size: 12px;
    color: #333;
    padding: 8px;
    background: #f9f9f9;
  }

  /* Logo */
  .logo-print {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;

    .brasao {
      width: 100px;
      margin-bottom: 10px;
    }

    p {
      margin: 0;
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
    }
  }

  /* Cabeçalho */
  .header td {
    padding: 0;
    border: none;
    text-align: center;
  }

  .header h4 {
    margin: 8px 0 4px;
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
  }

  .header p {
    margin: 2px 0;
    font-size: 15px;
    color: red;
    font-weight: bold;
  }

  /* Inputs para impressão */
  input[type="radio"],
  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 12px;
    height: 12px;
    border: 1px solid #000;
    vertical-align: middle;
    margin-right: 5px;
    background-color: transparent;
  }

  input[type="radio"]:checked::after,
  input[type="checkbox"]:checked::after {
    content: "X";
    font-weight: bold;
    display: block;
    text-align: center;
    line-height: 12px;
    font-size: 10pt;
    color: #000;
  }

  /* Força quebra de página na impressão */
  &.page-break {
    page-break-before: always;
  }

  /* ======= Estilização da legenda ======= */
  .legenda{
    font-size:11px;
    font-weight: bold;
    border: none;
  }
  /* ======= Estilização da assinatura ======= */
  .assinatura td {
    position: relative;
    padding-top: 120px;
    border: none;
    text-align: center;
  }

  /* =========== Estilização dos check-box ======== */
  tr .check-box {
    border: none;
    display: flex;
    gap: 10px;
    align-items: center;
  }

  tr .check-box label {
    display: flex;
    align-items: center;
  }

  /* =========== Estilização da assinatura digital ======== */
  .digital td {
    position: relative;
    height: 120px;
    border: none;
    text-align: center;
    vertical-align: middle;
  }

  .digital td div {
    display: block;
    margin: 0 auto;
    position: relative;
    top: 10px;
    height: 80px;
    width: 80px;
    border: 1px solid #000;
  }

  .digital td p {
    margin: 5px 0 0 0;
    position: relative;
    top: 10px;
    font-weight: bold;
  }

  /* REMOÇÃO DE FORMATAÇÃO DOS INPUTS */
  input[type="text"],
  input[type="date"],
  input[type="number"],
  textarea,
  select {
    width: 100%;
    border: none;
    background: transparent;
    font-family: inherit;
    font-size: 12px;
    color: #000;
    padding: 0;
    margin: 0;
    outline: none;
    appearance: none; /* Remove seta do select no Chrome/Safari */
    -moz-appearance: none; /* Remove seta do select no Firefox */
  }

  /* Estilo opcional para destacar onde pode digitar (apenas na tela) */
  input:focus, textarea:focus {
    background-color: #f9f9f9;
  }

  textarea {
    resize: none;
  }

  /* Ajuste para checkboxes e radios */
  input[type="checkbox"],
  input[type="radio"] {
    margin-right: 5px;
    vertical-align: middle;
  }

  .notes {
    font-style: italic;
    font-size: 10px;
    margin-top: 5px;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    cursor: pointer;
    background: #000;
    color: #fff;
    border: none;
    font-weight: bold;
  }
  .periodo-inputs {
  
  }
  /* =========== ESTILOS DE IMPRESSÃO ======== */
  @media print {
    @page {
        size: A4;
        margin: 1cm; /* Ajuste conforme necessário para não cortar */
      }
      
      body {
        margin: 0;
        -webkit-print-color-adjust: exact;
      }

    width: 100% !important;
    min-height: 100vh !important;
    margin: 0 !important;
    /* espaço superior extra para não colidir com o cabeçalho do navegador */
    padding: 1.8cm 1cm 1cm 1cm !important;
    border: none !important;
    box-shadow: none !important;
    background: white !important;
    
    /* Remove todos os elementos de interface do navegador */
    * {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    table {
      font-size: 10pt;
    }

    /* Impede que blocos sejam cortados entre páginas */
    tbody.bloco {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }

    th,
    td {
      padding: 0.1cm 0.2cm;
      height: 0.8cm;
      border-color: #000;
    }

    tr,
    th.section {
      page-break-inside: avoid;
      page-break-after: auto;
    }

    .logo-print {
      .brasao {
        width: 76px;
      }
      
      p {
        font-size: 13pt;
      }
    }
    
    /** Esconde o botão de salvar na impressão **/
    button {
      display: none !important; /* Esconde o botão de salvar na impressão */
    }

    input, textarea, select {
      border: none !important;
      background: transparent !important;
      -webkit-text-fill-color: #000000 !important;
      opacity: 1 !important;
    }

    .section {
      -webkit-print-color-adjust: exact; /* Garante que o cinza apareça na impressão */
    }

    /* Garante que o texto digitado seja visível e preto */
    input::placeholder {
      color: transparent;
    }
  }
`
export const ContainerButton = styled.div`
  display: flex;
  
  button {
    height: 50px;
    padding: 6px 12px;
    font-size: 16px;
    margin: 20px auto;
    display: block;
    cursor: pointer;
    background-color: #0892c9;
    color: #FFFFFF;
    border-radius: 8px;
    border: none;
  }
`