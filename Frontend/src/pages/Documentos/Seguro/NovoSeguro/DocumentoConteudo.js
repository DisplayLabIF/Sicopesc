import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef } from "react";
import { Container } from "./styles";
import brasao from "./assets/image.jpg";
import api from "../../../../services/api";
import { dateFormat } from "../../../../Utils/index";
import { cpfMask } from "../../../../Utils/Masks";


const DocumentoConteudo = forwardRef((props, ref) => {
   const [pescador, setPescador] = useState({});
   const [enderecos, setEnderecos] = useState([]);
   const [loading, setLoading] = useState(true);
   const printRef = useRef(null);
   const [cpf, setcpf] = useState("");


   // estado para o formulário
   const [formData, setFormData] = useState({
       apelido: "",
       local_nascimento: "",
       rg_data_expedicao: "",
       rg_local_expedicao: "",
       local_declaracao: "",
       data_declaracao: "",
       observacoes_gerais: "",
      
       // Objetos menores para o mapeamento
       atividade: {
           // 2. Período de atividade pesca
           data_inicio: "",
           data_fim: "",
           local: "MAR",
           situacao: "INDIVIDUAL",
           observacoes: ""
       },
       familiar1: { nome: "", cpf: "", nascimento: "", estado_civil: "SOLTEIRO", parentesco: "", condicao: "COMPONENTE" },
       familiar2: { nome: "", cpf: "", nascimento: "", estado_civil: "SOLTEIRO", parentesco: "", condicao: "COMPONENTE" },
       familiar3: { nome: "", cpf: "", nascimento: "", estado_civil: "SOLTEIRO", parentesco: "", condicao: "COMPONENTE" },
       embarcacao: {
           // 3. Condição em relação a embarcação
           data_inicio: "",
           data_fim: "",
           condicao: "SEM_EMBARCACAO",
           arqueacao_bruta: 0,
           observacao_condicao: "",
          
           // 3.1 Arrendamento Proprietário
           data_inicio_proprietario: "",
           data_fim_proprietario: "",


           // 3.2 Nome e CPF do titular da embarcação
           nome_titular: "",
           cpf_titular: "",
           data_inicio_titular: "",
           data_fim_titular: "",
           observacao_titular: "",


           // 3.3 Atividade pesqueira
           atividade: "",
           subsistencia: "SUBSISTENCIA",


           // 3.4 Recolhimento de IPI
           recolhimento_ipi: false,
           data_inicio_ipi: "",
           data_fim_ipi: "",


           // 3.5 Dados da embarcação
           possui_empregados: false,
           nome_empregados: "",
           cpf_empregados: "",
           data_inicio_empregados: "",
           data_fim_empregados: ""
       },
       outra_renda: {
           // 4. Outras atividades / rendas
           atividade: "",
           local: "",
           data_inicio_renda: "",
           data_fim_renda: "",
           renda: "",


           // 4.1 Recebeu outra renda
           recebeu_outrarenda: false,
           atividade_outrarenda: "",
           data_inicio_outrarenda: "",
           data_fim_outrarenda: "",
           renda_outrarenda: "",
           observacao_outrarenda: "",


           // 4.2 Participa de cooperativa
           participa_cooperativa: false,
           nome_cooperativa: "",
           cnpj_cooperativa: "",
           tipo_cooperativa: "AGROPECUARIA",
       }
   });


   const normalizeDate = (date) => (date && date.trim() !== "" ? date : null);


   const handleSave = async () => {
       if (!pescador?.id) return alert("Aguarde o carregamento do pescador.");


       // montagem do objeto mestre
       const objetoMestre = {
           pescador_id: pescador.id,
           entidade_id: 1,
           apelido: pescador.apelido || formData.apelido,
           local_nascimento: formData.local_nascimento,
           rg_data_expedicao: normalizeDate(formData.rg_data_expedicao),
           rg_local_expedicao: formData.rg_local_expedicao,
           local_declaracao: formData.local_declaracao,
           data_declaracao: normalizeDate(formData.data_declaracao),
           observacoes_gerais: formData.observacoes_gerais,


           // Relacionamentos (Arrays)
           atividades: [{
               ...formData.atividade,
               data_inicio: normalizeDate(formData.atividade.data_inicio || null),
               data_fim: normalizeDate(formData.atividade.data_fim || null)
           }],
           familiares: [
               { ...formData.familiar1, nascimento: normalizeDate(formData.familiar1.nascimento || null) },
               { ...formData.familiar2, nascimento: normalizeDate(formData.familiar2.nascimento || null) },
               { ...formData.familiar3, nascimento: normalizeDate(formData.familiar3.nascimento || null) }
           ].filter(f => f.nome.trim() !== ""),
           embarcacoes: [{
               ...formData.embarcacao,
               data_inicio: normalizeDate(formData.embarcacao.data_inicio || null),
               data_fim: normalizeDate(formData.embarcacao.data_fim || null),
               data_inicio_proprietario: normalizeDate(formData.embarcacao.data_inicio_proprietario || null),
               data_fim_proprietario: normalizeDate(formData.embarcacao.data_fim_proprietario || null),
               data_inicio_titular: normalizeDate(formData.embarcacao.data_inicio_titular || null),
               data_fim_titular: normalizeDate(formData.embarcacao.data_fim_titular || null),
               data_inicio_ipi: normalizeDate(formData.embarcacao.data_inicio_ipi || null),
               data_fim_ipi: normalizeDate(formData.embarcacao.data_fim_ipi || null),
               data_inicio_empregados: normalizeDate(formData.embarcacao.data_inicio_empregados || null),
               data_fim_empregados: normalizeDate(formData.embarcacao.data_fim_empregados || null),
               arqueacao_bruta: parseFloat(formData.embarcacao.arqueacao_bruta) || null,
           }],
           rendas: [{
               ...formData.outra_renda,
               data_inicio_renda: normalizeDate(formData.outra_renda.data_inicio_renda || null),
               data_fim_renda: normalizeDate(formData.outra_renda.data_fim_renda || null),
               data_inicio_outrarenda: normalizeDate(formData.outra_renda.data_inicio_outrarenda || null),
               data_fim_outrarenda: normalizeDate(formData.outra_renda.data_fim_outrarenda || null),
               renda_outrarenda: parseFloat(formData.outra_renda.renda_outrarenda) || null,
           }]
       };


       try {
           await api.post("/seguros", objetoMestre);
           alert("Seguro e todas as informações relacionadas foram salvos!");
       } catch (error) {
           console.error("Erro ao salvar:", error.response?.data || error);
           alert("Erro ao salvar. Verifique se os campos obrigatórios e Enums estão corretos.");
       }
   };


   // enxergando o handleSave para o componente pai (ShowSeguro) através da ref
   useImperativeHandle(ref, () => ({
       handleSave,
       printRef: printRef.current
   }));


   const handleChange = (e) => {
       const { name, value, type, checked } = e.target;
       const val = type === 'checkbox' ? checked : value;


       if (name.includes(".")) {
           const [parent, child] = name.split(".");
           setFormData(prev => ({
               ...prev,
               [parent]: { ...prev[parent], [child]: val }
           }));
       } else {
           setFormData(prev => ({ ...prev, [name]: val }));
       }
   };


   useEffect(() => {
       async function loadData() {
           const id = props.id || window.location.pathname.split("/").pop();
           if (!id || id === "novo-pescador") return;
           try {
               const [resPescador, resEndereco] = await Promise.all([
                   api.get(`/pescadores/${id}`),
                   api.get(`/pescadores/${id}/enderecos`)
               ]);
               setPescador(resPescador.data || {});
               setEnderecos(resEndereco.data || []);
           } catch (error) {
               console.error("Erro API:", error);
           } finally {
               setLoading(false);
           }
       }
       loadData();
   }, [props.id]);


   if (loading) return <div>Carregando formulário...</div>;
  
   return (
       <Container ref={printRef}>
           <table>
           <thead>
               <tr>
                   <td colSpan="4">
                       <div className="logo-print">
                           <img src={brasao} alt="Brasão" className="brasao" />
                           <p>INSTITUTO NACIONAL DO SEGURO SOCIAL</p>
                       </div>
                   </td>
               </tr>
           </thead>
           <tbody>
               <tr className="header">
                   <td colSpan="4">
                       <h4>ANEXO II</h4>
                       <h4>OFÍCIO-CIRCULAR Nº 46 DIRBEN/INSS, DE 13 DE SETEMBRO DE 2019.</h4>
                       <h4>AUTODECLARAÇÃO DO SEGURADO ESPECIAL – PESCADOR</h4>
                       <p>TODAS AS INFORMAÇÕES SERÃO CHECADAS NOS SISTEMAS OFICIAIS</p>
                   </td>
               </tr>
               <tr>
                   <th className="section" colSpan="4">1. Dados do Segurado</th>
               </tr>
               <tr>
                   <th>Nome:</th>
                   <td className="wide">{pescador?.nome || ""}</td>
                   <th>Apelido:</th>
                   <td>
                       <input
                           type="text"
                           name="apelido"
                           value={pescador?.apelido || ""}
                           onChange={e => {
                               const valor = e.target.value;
                               setPescador(prev => ({ ...prev, apelido: valor }));
                           }}
                       />
                   </td>
               </tr>
               <tr>
                   <th>Data de Nascimento (DN):</th>
                   <td>{dateFormat(pescador?.nascimento)}</td>
                   <th>Local de Nascimento:</th>
                   <td>
                       <input
                           type="text"
                           name="local_nascimento"
                           value={formData.local_nascimento}
                           onChange={handleChange}
                       />
                   </td>
               </tr>
               <tr>
                   <th>Endereço Residencial:</th>
                   <td colSpan="3">
                       {enderecos.length > 0 ? `${enderecos[0].logradouro}, ${enderecos[0].numero} - ${enderecos[0].bairro}` : "Endereço não informado"}
                   </td>
               </tr>
               <tr>
                   <th>Município:</th>
                   <td>{enderecos?.[0]?.cidade || "município não informado"}</td>
                   <th>UF:</th>
                   <td>
                       <input
                           type="text"
                           name="uf"
                           value={enderecos?.[0]?.estado || ""}
                           onChange={e => {
                               // Opcional: implementar edição do endereço
                           }}
                           placeholder="UF não informado"
                       />
                   </td>
               </tr>
               <tr>
                   <th>CPF:</th>
                   <td>{pescador?.cpf || ""}</td>
                   <th>RG:</th>
                   <td>{pescador?.rg || ""}</td>
               </tr>
               <tr>
                   <th>Data/Local de Expedição (RG):</th>
                   <td>
                       <input
                           type="date"
                           name="rg_data_expedicao"
                           value={formData.rg_data_expedicao}
                           onChange={handleChange}
                           placeholder="Data/Local"
                       />
                       <span> / </span>
                       <input
                           type="text"
                           name="rg_local_expedicao"
                           value={formData.rg_local_expedicao}
                           onChange={handleChange}
                           placeholder="Local"
                       />
                   </td>
                   <th>*RGP / Matrícula CEI/CAEPF:</th>
                   <td>{pescador?.cei || ""}</td>
               </tr>
               <tr>
                   <th className="section" colSpan="4">2. Período(s) de atividade pesca</th>
               </tr>
               <tr>
                   <th>Período (dd/mm/aaaa a dd/mm/aaaa):</th>
                   <th>Local onde exerce a atividade*:</th>
                   <th>Situação:</th>
                   <th>Observações:</th>
               </tr>
               <tr>
                   <td>
                       <input
                           type="date"
                           name="atividade.data_inicio"
                           value={formData.atividade.data_inicio}
                           onChange={handleChange}
                           placeholder="Início"
                           style={{ width: "45%" }}
                       />
                       <span> a </span>
                       <input
                           type="date"
                           name="atividade.data_fim"
                           value={formData.atividade.data_fim}
                           onChange={handleChange}
                           placeholder="Fim"
                           style={{ width: "45%" }}
                       />
                   </td>
                   <td>
                       <select
                           name="atividade.local"
                           value={formData.atividade.local}
                           onChange={handleChange}
                       >
                           <option value="">Selecione o local...</option>
                           <option value="MAR">Mar</option>
                           <option value="RIO">Rio</option>
                           <option value="ESTUARIO">Estuário</option>
                           <option value="LAGOA">Lagoa</option>
                           <option value="ACUDE">Açude</option>
                           <option value="REPRESA">Represa</option>
                       </select>
                   </td>
                   <td>
                       <label>
                           <input
                               type="radio"
                               name="atividade.situacao" // Nome batendo com o objeto.campo
                               value="INDIVIDUAL"
                               checked={formData.atividade.situacao === "INDIVIDUAL"}
                               onChange={handleChange} // Usa a sua função padrão
                           /> Individualmente
                       </label>
                       <br />
                       <label>
                           <input
                               type="radio"
                               name="atividade.situacao"
                               value="ECONOMIA_FAMILIAR"
                               checked={formData.atividade.situacao === "ECONOMIA_FAMILIAR"}
                               onChange={handleChange}
                           /> Regime de economia familiar
                       </label>
                   </td>
                   <td>
                       <input
                           type="text"
                           name="atividade.observacoes"
                           value={formData.atividade.observacoes}
                           onChange={handleChange}
                       />
                   </td>
               </tr>
               <tr><td></td><td></td><td></td><td></td></tr>
               <tr>
                   <th className="section" colSpan="4">2.1. Condição no grupo (economia familiar)</th>
               </tr>
               <tr>
                   <th>Condição</th>
                   <td colSpan="3">
                       <label>
                           <input
                               type="radio"
                               name="condicao"
                               value="TITULAR"
                               checked={formData.condicao === "TITULAR"}
                               onChange={handleChange}
                           /> Titular
                       </label>
                       <label>
                           <input
                               type="radio"
                               name="condicao"
                               value="COMPONENTE"
                               checked={formData.condicao === "COMPONENTE"}
                               onChange={handleChange}
                           /> Componente
                       </label>
                   </td>
               </tr>
               <tr>
                   <th className="section" colSpan="4">2.2. Grupo Familiar (quando aplicável)</th>
               </tr>
               {/* Exemplo de campos para grupo familiar, pode ser expandido para lista dinâmica */}
               <tr>
                   <th>Nome:</th><td><input type="text" name="familiar1.nome" value={formData.familiar1.nome} onChange={handleChange} /></td>
                   <th>Data Nasc (DN):</th><td><input type="date" name="familiar1.nascimento" value={formData.familiar1.nascimento} onChange={handleChange} /></td>
               </tr>
               <tr>
                   <th>CPF:</th>
                   <td>
                       <input
                           type="text"
                           name="familiar1.cpf"
                           value={formData.familiar1.cpf}
                           onChange={(e) =>
                               setFormData({
                               ...formData,
                               familiar1: {
                                   ...formData.familiar1,
                                   cpf: cpfMask(e.target.value),
                               },
                               })
                           }
                       />
                   </td>
               </tr>
               <tr>
                   <th>Estado Civil:</th>
                   <td>
                       <select
                           name="familiar1.estado_civil"
                           value={formData.familiar1.estado_civil}
                           onChange={handleChange}
                       >
                           <option value="">Selecione...</option>
                           <option value="SOLTEIRO">Solteiro(a)</option>
                           <option value="CASADO">Casado(a)</option>
                           <option value="DIVORCIADO">Divorciado(a)</option>
                           <option value="VIUVO">Viúvo(a)</option>
                       </select>
                   </td>
                   <th>Parentesco:</th><td><input type="text" name="familiar1.parentesco"  value={formData.familiar1.parentesco} onChange={handleChange} /></td>
               </tr>


               {/** Campos para o segundo familiar */}
               <tr>
                   <th>Nome:</th><td><input type="text" name="familiar2.nome" value={formData.familiar2.nome} onChange={handleChange} /></td>
                   <th>Data Nasc (DN):</th><td><input type="date" name="familiar2.nascimento" value={formData.familiar2.nascimento} onChange={handleChange} /></td>
               </tr>
               <tr>
                   <th>CPF:</th>
                   <td>
                       <input
                           type="text"
                           name="familiar2.cpf"
                           value={formData.familiar2.cpf}
                           onChange={(e) =>
                               setFormData({
                                   ...formData,
                                   familiar2: {
                                       ...formData.familiar2,
                                       cpf: cpfMask(e.target.value),
                                   },
                               })
                           }
                       />
                   </td>
               </tr>
               <tr>
                   <th>Estado Civil:</th>
                   <td>
                       <select
                           name="familiar2.estado_civil"
                           value={formData.familiar2.estado_civil}
                           onChange={handleChange}
                       >
                           <option value="">Selecione...</option>
                           <option value="SOLTEIRO">Solteiro(a)</option>
                           <option value="CASADO">Casado(a)</option>
                           <option value="DIVORCIADO">Divorciado(a)</option>
                           <option value="VIUVO">Viúvo(a)</option>
                       </select>
                   </td>
                   <th>Parentesco:</th><td><input type="text" name="familiar2.parentesco"  value={formData.familiar2.parentesco} onChange={handleChange} /></td>
               </tr>


               {/** Campos para o terceiro familiar */}
               <tr>
                   <th>Nome:</th><td><input type="text" name="familiar3.nome" value={formData.familiar3.nome} onChange={handleChange} /></td>
                   <th>Data Nasc (DN):</th><td><input type="date" name="familiar3.nascimento" value={formData.familiar3.nascimento} onChange={handleChange} /></td>
               </tr>
               <tr>
                   <th>CPF:</th>
                   <td>
                       <input
                           type="text"
                           name="familiar3.cpf"
                           value={formData.familiar3.cpf}
                           onChange={(e) =>
                               setFormData({
                                   ...formData,
                                   familiar3: {
                                       ...formData.familiar3,
                                       cpf: cpfMask(e.target.value),
                                   },
                               })
                           }
                       />
                   </td>
               </tr>
               <tr>
                   <th>Estado Civil:</th>
                   <td>
                       <select
                           name="familiar3.estado_civil"
                           value={formData.familiar3.estado_civil}
                           onChange={handleChange}
                       >
                           <option value="">Selecione...</option>
                           <option value="SOLTEIRO">Solteiro(a)</option>
                           <option value="CASADO">Casado(a)</option>
                           <option value="DIVORCIADO">Divorciado(a)</option>
                           <option value="VIUVO">Viúvo(a)</option>
                       </select>
                   </td>
                   <th>Parentesco:</th><td><input type="text" name="familiar3.parentesco"  value={formData.familiar3.parentesco} onChange={handleChange} /></td>
               </tr>
               <tr>
                   <th className="section" colSpan="4">3. Condição em relação à embarcação</th>
               </tr>
               <tr>
                   <th>Período (dd/mm/aaaa a dd/mm/aaaa):</th>
                   <th>Condição em relação à embarcação*:</th>
                   <th>Arqueação bruta (AB):</th>
                   <th>Observações:</th>
               </tr>
               <tr>
                   <td className="periodo-inputs">
                       <input
                           type="date"
                           name="embarcacao.data_inicio"
                           value={formData.embarcacao.data_inicio}
                           onChange={handleChange}
                           placeholder="Inicio"
                       />
                       <span> a </span>
                       <input
                           type="date"
                           name="embarcacao.data_fim"
                           value={formData.embarcacao.data_fim}
                           onChange={handleChange}
                           placeholder="Fim"
                       />
                   </td>
                   <td>
                       <input
                           type="text"
                           name="embarcacao.condicao"
                           value={formData.embarcacao.condicao}
                           onChange={handleChange}
                           placeholder="Ex: SEM_EMBARCACAO"
                       />
                   </td>
                   <td>
                       <input
                           type="number"
                           name="embarcacao.arqueacao_bruta"
                           value={formData.embarcacao.arqueacao_bruta}
                           onChange={handleChange}
                       />
                   </td>
                   <td>
                       <input
                           type="text"
                           name="embarcacao.observacoes"
                           value={formData.embarcacao.observacoes}
                           onChange={handleChange}
                       />
                   </td>
               </tr>
               <tr>
                   <th className="section" colSpan="4">3.1. Arrendamento (se proprietário)</th>
               </tr>
               <tr>
                   <th>Período:</th>
                   <td colSpan="3">
                       <input type="date" name="arrendamento.data_inicio_proprietario" placeholder="Inicio" value={formData.embarcacao.data_inicio_proprietario} onChange={handleChange} />
                       <span> / </span>
                       <input type="date" name="arrendamento.data_fim_proprietario" placeholder="Fim" value={formData.embarcacao.data_fim_proprietario} onChange={handleChange} />
                   </td>
               </tr>
               <tr>
                   <th className="section" colSpan="4">3.2. Nome e CPF do(s) titular(es) da embarcação</th>
               </tr>
               <tr>
                   <th>Nome</th><th>CPF</th><th>Período</th><th>Observações</th>
               </tr>
               <tr>
                   <td><input type="text" name="embarcacao.nome_titular" value={formData.embarcacao.nome_titular} onChange={handleChange} /></td>
                   <td>
                       <input
                           type="text"
                           name="embarcacao.cpf_titular"
                           value={formData.embarcacao.cpf_titular}
                           onChange={(e) =>
                               setFormData({
                                   ...formData,
                                   embarcacao: {
                                       ...formData.embarcacao,
                                       cpf_titular: cpfMask(e.target.value),
                                   },
                               })
                           }
                       />
                   </td>
                   <td>
                       <input type="date" name="embarcacao.data_inicio_titular" placeholder="Inicio" value={formData.embarcacao.data_inicio_titular} onChange={handleChange} /> <span> / </span>
                       <input type="date" name="embarcacao.data_fim_titular" placeholder="Fim" value={formData.embarcacao.data_fim_titular} onChange={handleChange} /></td>
                   <td><input type="text" name="embarcacao.observacao_titular" value={formData.embarcacao.observacao_titular} onChange={handleChange} /></td>
               </tr>
               <tr>
                   <th className="section" colSpan="4">3.3. Atividade pesqueira</th>
               </tr>
               <tr>
                   <th>Atividade</th>
                   <td>
                       <input type="text" name="embarcacao.atividade" value={formData.embarcacao.atividade} onChange={handleChange} />
                   </td>
                   <th>Subsistência / Venda</th>
                   <td>
                       <label>
                           <input type="checkbox" name="embarcacao.subsistencia" checked={formData.embarcacao.subsistencia} onChange={handleChange} /> Subsistência
                       </label>
                       <label>
                           <input type="checkbox" name="embarcacao.venda" checked={formData.embarcacao.venda} onChange={handleChange} /> Venda
                       </label>
                   </td>
               </tr>
               <tr>
                   <th className="section" colSpan="4">3.4. Recolhimento de IPI sobre venda da produção</th>
               </tr>
               <tr>
                   <th>Houve recolhimento de IPI?</th>
                   <td>
                       <label>
                           <input
                               type="radio"
                               name="embarcacao.recolhimento_ipi"
                               checked={formData.embarcacao.recolhimento_ipi === true}
                               onChange={() => setFormData(prev => ({
                                   ...prev,
                                   embarcacao: { ...prev.embarcacao, recolhimento_ipi: true }
                               }))}
                           /> Sim
                       </label>
                       <label>
                           <input
                               type="radio"
                               name="embarcacao.recolhimento_ipi"
                               checked={formData.embarcacao.recolhimento_ipi === false}
                               onChange={() => setFormData(prev => ({
                                   ...prev,
                                   embarcacao: { ...prev.embarcacao, recolhimento_ipi: false }
                               }))}
                           /> Não
                       </label>
                       <br />Período: (dd/mm/aaaa a dd/mm/aaaa)
                   </td>


                   {/* A MÁGICA ACONTECE AQUI: Só renderiza se for true */}
                   {formData.embarcacao.recolhimento_ipi === true ? (
                       <>
                           <th>Período IPI:</th>
                           <td>
                               <input
                                   type="date"
                                   name="embarcacao.data_inicio_ipi"
                                   value={formData.embarcacao.data_inicio_ipi}
                                   onChange={handleChange}
                               />
                               <span> a </span>
                               <input
                                   type="date"
                                   name="embarcacao.data_fim_ipi"
                                   value={formData.embarcacao.data_fim_ipi}
                                   onChange={handleChange}
                               />
                           </td>
                       </>
                   ) : (
                       <td colSpan="2"></td> // Preenche o espaço vazio da tabela se for 'Não'
                   )}
               </tr>
               <tr>
                   <th className="section" colSpan="4">3.5. Possui empregado(s) ou prestador(es) de serviço</th>
               </tr>
               <tr>
                   <th>Possui empregado(s)?</th>
                   <td colSpan="3">
                       <label>
                           <input
                               type="radio"
                               name="embarcacao.possui_empregados"
                               checked={formData.embarcacao.possui_empregados === true}
                               onChange={() => setFormData(prev => ({
                                   ...prev,
                                   embarcacao: { ...prev.embarcacao, possui_empregados: true }
                               }))}
                           /> SIM
                       </label>
                       <label style={{ marginLeft: "15px" }}>
                           <input
                               type="radio"
                               name="embarcacao.possui_empregados"
                               checked={formData.embarcacao.possui_empregados === false}
                               onChange={() => setFormData(prev => ({
                                   ...prev,
                                   embarcacao: { ...prev.embarcacao, possui_empregados: false }
                               }))}
                           /> NÃO
                       </label>
                       <br />Se sim: Nome / CPF / Período
                       <div className="notes">
                           Observação: esta declaração deverá ser assinada pelo declarante em todas as suas páginas.
                       </div>
                   </td>
               </tr>


               {/* LINHAS CONDICIONAIS: Só aparecem se for SIM */}
               {formData.embarcacao.possui_empregados === true && (
                   <>
                       <tr>
                           <th>Nome do(s) Empregado(s):</th>
                           <td>
                               <input
                                   type="text"
                                   name="embarcacao.nome_empregados"
                                   value={formData.embarcacao.nome_empregados}
                                   onChange={handleChange}
                               />
                           </td>
                           <th>CPF do(s) Empregado(s):</th>
                           <td>
                               <input
                                   type="text"
                                   name="embarcacao.cpf_empregados"
                                   value={formData.embarcacao.cpf_empregados}
                                   onChange={(e) =>
                                       setFormData({
                                           ...formData,
                                           embarcacao: {
                                               ...formData.embarcacao,
                                               cpf_empregados: cpfMask(e.target.value),
                                           },
                                       })
                                   }
                               />
                           </td>
                       </tr>
                       <tr>
                           <th>Período de Trabalho:</th>
                           <td colSpan="3">
                               <input
                                   type="date"
                                   name="embarcacao.data_inicio_empregados"
                                   value={formData.embarcacao.data_inicio_empregados}
                                   onChange={handleChange}
                               />
                               <span> até </span>
                               <input
                                   type="date"
                                   name="embarcacao.data_fim_empregados"
                                   value={formData.embarcacao.data_fim_empregados}
                                   onChange={handleChange}
                               />
                           </td>
                       </tr>
                   </>
               )}
               <tr>
                   <th className="section" colSpan="4">4. Outras atividades / rendas</th>
               </tr>
               <tr>
                   <th>Atividade</th>
                   <th>Local</th>
                   <th>Período</th>
                   <th>Renda (R$) / Outras informações</th>
               </tr>
               <tr>
                   <td><input type="text" name="outra_renda.atividade" value={formData.outra_renda.atividade} onChange={handleChange} /></td>
                   <td><input type="text" name="outra_renda.local" value={formData.outra_renda.local} onChange={handleChange} /></td>
                   <td><input type="text" name="outra_renda.periodo" value={formData.outra_renda.periodo} onChange={handleChange} /></td>
                   <td><input type="text" name="outra_renda.valor" value={formData.outra_renda.valor} onChange={handleChange} /></td>
               </tr>
               <tr>
                   <th className="section" colSpan="4">4.1. Recebeu outra renda (ex.: atividade turística, mandato etc.)</th>
               </tr>
               <tr>
                   <th>Recebeu outra renda? (Atividade turística, mandato, etc)</th>
                   <td colSpan="3">
                       <label>
                           <input
                               type="radio"
                               name="outra_renda.recebeu_outrarenda"
                               checked={formData.outra_renda.recebeu_outrarenda === true}
                               onChange={() => setFormData(prev => ({
                                   ...prev,
                                   outra_renda: { ...prev.outra_renda, recebeu_outrarenda: true }
                               }))}
                           /> SIM
                       </label>
                       <label style={{ marginLeft: "15px" }}>
                           <input
                               type="radio"
                               name="outra_renda.recebeu_outrarenda"
                               checked={formData.outra_renda.recebeu_outrarenda === false}
                               onChange={() => setFormData(prev => ({
                                   ...prev,
                                   outra_renda: { ...prev.outra_renda, recebeu_outrarenda: false }
                               }))}
                           /> NÃO
                       </label>
                   </td>
               </tr>


               {/* LINHAS CONDICIONAIS PARA OUTRA RENDA */}
               {formData.outra_renda.recebeu_outrarenda === true && (
                   <>
                       <tr>
                           <th>Atividade:</th>
                           <td>
                               <input
                                   type="text"
                                   name="outra_renda.atividade_outrarenda"
                                   value={formData.outra_renda.atividade_outrarenda}
                                   onChange={handleChange}
                               />
                           </td>
                           <th>Valor da Renda (R$):</th>
                           <td>
                               <input
                                   type="number"
                                   name="outra_renda.renda_outrarenda"
                                   value={formData.outra_renda.renda_outrarenda}
                                   onChange={handleChange}
                               />
                           </td>
                       </tr>
                       <tr>
                           <th>Período:</th>
                           <td>
                               <input
                                   type="date"
                                   name="outra_renda.data_inicio_outrarenda"
                                   value={formData.outra_renda.data_inicio_outrarenda}
                                   onChange={handleChange}
                               />
                               <span> a </span>
                               <input
                                   type="date"
                                   name="outra_renda.data_fim_outrarenda"
                                   value={formData.outra_renda.data_fim_outrarenda}
                                   onChange={handleChange}
                               />
                           </td>
                           <th>Observações:</th>
                           <td>
                               <input
                                   type="text"
                                   name="outra_renda.observacao_outrarenda"
                                   value={formData.outra_renda.observacao_outrarenda}
                                   onChange={handleChange}
                               />
                           </td>
                       </tr>
                   </>
               )}
               <tr>
                   <th className="section" colSpan="4">4.2. Participa de cooperativa</th>
               </tr>
               <tr>
                   <th>Participa de cooperativa?</th>
                   <td colSpan="3">
                       <label>
                           <input
                               type="radio"
                               name="outra_renda.participa_cooperativa"
                               checked={formData.outra_renda.participa_cooperativa === true}
                               onChange={() => setFormData(prev => ({
                                   ...prev,
                                   outra_renda: { ...prev.outra_renda, participa_cooperativa: true }
                               }))}
                           /> SIM
                       </label>
                       <label style={{ marginLeft: "15px" }}>
                           <input
                               type="radio"
                               name="outra_renda.participa_cooperativa"
                               checked={formData.outra_renda.participa_cooperativa === false}
                               onChange={() => setFormData(prev => ({
                                   ...prev,
                                   outra_renda: { ...prev.outra_renda, participa_cooperativa: false }
                               }))}
                           /> NÃO
                       </label>
                   </td>
               </tr>


               {/* LINHAS CONDICIONAIS PARA COOPERATIVA */}
               {formData.outra_renda.participa_cooperativa === true && (
                   <>
                       <tr>
                           <th>Nome da Cooperativa:</th>
                           <td>
                               <input
                                   type="text"
                                   name="outra_renda.nome_cooperativa"
                                   value={formData.outra_renda.nome_cooperativa}
                                   onChange={handleChange}
                               />
                           </td>
                           <th>CNPJ:</th>
                           <td>
                               <input
                                   type="text"
                                   name="outra_renda.cnpj_cooperativa"
                                   value={formData.outra_renda.cnpj_cooperativa}
                                   onChange={handleChange}
                                   placeholder="00.000.000/0000-00"
                               />
                           </td>
                       </tr>
                       <tr>
                           <th>Tipo de Cooperativa:</th>
                           <td colSpan="3">
                               <select
                                   name="outra_renda.tipo_cooperativa"
                                   value={formData.outra_renda.tipo_cooperativa}
                                   onChange={handleChange}
                               >
                                   <option value="">Selecione o tipo...</option>
                                   <option value="AGROPECUARIA">Agropecuária</option>
                                   <option value="CREDITO_RURAL">Crédito Rural</option>
                               </select>
                           </td>
                       </tr>
                   </>
               )}
               <tr>
                   <th className="section" colSpan="4">Declaração</th>
               </tr>
               <tr>
                   <td colSpan="4" className="notes">
                       <textarea
                           name="observacoes_gerais"
                           value={formData.observacoes_gerais}
                           onChange={handleChange}
                           style={{ width: "100%" }}
                       />
                       <div>
                           Declaro sob as penas previstas na legislação, que as informações prestadas nesta declaração são verdadeiras,
                           estando ciente das penalidades do Art. 299 do Código Penal Brasileiro.
                       </div>
                   </td>
               </tr>
               <tr>
                   <th>Local</th>
                   <td>
                       <input
                           type="text"
                           name="local_declaracao"
                           value={formData.local_declaracao}
                           onChange={handleChange}
                           />
                   </td>
                   <th>Data</th>
                   <td>
                       <input
                           type="date"
                           name="data_declaracao"
                           value={formData.data_declaracao}
                           onChange={handleChange}
                           />
                   </td>
               </tr>
               <tr>
                   <th>Assinatura do segurado/requerente</th>
                   <td colSpan="3">
                      
                   </td>
               </tr>
           </tbody>
           </table>
       </Container>
   );
});


export default DocumentoConteudo;