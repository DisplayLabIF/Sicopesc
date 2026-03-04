import React, { forwardRef, useEffect, useState  } from "react";
import { Container } from "./styles";
import brasao from "./assets/image.jpg";
import api from "../../../../services/api";
import { dateFormat } from "../../../../Utils";

const DocumentoConteudo = forwardRef((props, ref) => {
    const [pescador, setPescador] = useState(null);
    const [enderecos, setEnderecos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Carrega os dados pois o ID vem pela URL e não é passado como prop
    useEffect(() => {
        async function loadPescador() {
            const id = props.id || 
                    props.match?.params?.id || 
                    window.location.pathname.split("/").pop(); // Pega o último item da URL

            //console.log("ID detectado:", id); // Verifica se o ID está vindo corretamente

            if (!id || id === "undefined") {
                console.error("ID continua vindo como undefined");
                return;
            }

            try {
                const response = await api.get(`/pescadores/${id}`);
                const response2 = await api.get(`/pescadores/${id}/enderecos`);
                setEnderecos(response2.data);
                setPescador(response.data);
            } catch (error) {
                console.error("Erro na API:", error);
            } finally {
                setLoading(false);
            }
        }

        loadPescador();
    }, [props.id, props.match]);
    
    return (
    <Container ref={ref}>
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
                <td className="wide">{pescador?.nome}</td>
                <th>Apelido:</th>
                <td></td>
            </tr>
            <tr>
                <th>Data de Nascimento (DN):</th>
                <td>{dateFormat(pescador?.nascimento)}</td>
                <th>Local de Nascimento:</th>
                <td></td>
            </tr>
            <tr>
                <th>Endereço Residencial:</th>
                <td colSpan="3"> 
                    {enderecos.length > 0 ? `${enderecos[0].logradouro}, ${enderecos[0].numero} - ${enderecos[0].bairro}` : ""}
                </td>
            </tr>
            <tr>
                <th>Município:</th><td>{enderecos?.[0]?.cidade || "município não informado"}</td>
                <th>UF:</th><td>{enderecos?.[0]?.estado || "UF não informado"}</td>
            </tr>
            <tr>
                <th>CPF:</th><td>{pescador?.cpf}</td>
                <th>RG:</th><td>{pescador?.rg}</td>
            </tr>
            <tr>
                <th>Data/Local de Expedição (RG):</th><td></td>
                <th>*RGP / Matrícula CEI/CAEPF:</th><td>{pescador?.cei}</td>
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
            {/* repetir linhas conforme necessário */}
            <tr>
                <td></td>
                <td>*Mar / Rio / Estuário / Lagoa / Açude / Represa</td>
                <td>
                <input type="checkbox" readOnly /> Individualmente<br />
                <input type="checkbox" readOnly /> Regime de economia familiar
                </td>
                <td></td>
            </tr>
            <tr><td></td><td></td><td></td><td></td></tr>
            <tr>
                <th className="section" colSpan="4">2.1. Condição no grupo (economia familiar)</th>
            </tr>
            <tr>
                <th>Condição</th>
                <td colSpan="3">
                <input type="radio" name="condicao" readOnly /> Titular
                <input type="radio" name="condicao" readOnly /> Componente
                </td>
            </tr>
            <tr>
                <th className="section" colSpan="4">2.2. Grupo Familiar (quando aplicável)</th>
            </tr>
            <tr>
                <th>Nome:</th><td></td>
                <th>Data Nasc (DN):</th><td></td>
            </tr>
            <tr>
                <th>CPF:</th><td></td>
            </tr>
            <tr>
                <th>Estado Civil:</th><td></td>
                <th>Parentesco:</th><td></td>
            </tr>
            <tr>
                <th>Nome:</th><td></td>
                <th>Data Nasc (DN):</th><td></td>
            </tr>
            <tr>
                <th>CPF:</th><td></td>
            </tr>
            <tr>
                <th>Estado Civil:</th><td></td>
                <th>Parentesco:</th><td></td>
            </tr>
            <tr>
                <th>Nome:</th><td></td>
                <th>Data Nasc (DN):</th><td></td>
            </tr>
            <tr>
                <th>CPF:</th><td></td>
            </tr>
            <tr>
                <th>Estado Civil:</th><td></td>
                <th>Parentesco:</th><td></td>
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
                <td></td>
                <td>*Arrendatário / Comodatário / Meeiro / Parceiro / Proprietário / Pescador artesanal ou mariscador sem embarcação</td>
                <td></td><td></td>
            </tr>
            <tr>
                <th className="section" colSpan="4">3.1. Arrendamento (se proprietário)</th>
            </tr>
            <tr><th>Período:</th><td colSpan="3"></td></tr>
            <tr>
                <th className="section" colSpan="4">3.2. Nome e CPF do(s) titular(es) da embarcação</th>
            </tr>
            <tr><th>Nome</th><th>CPF</th><th>Período</th><th>Observações</th></tr>
            <tr><td></td><td></td><td></td><td></td></tr>
            <tr>
                <th className="section" colSpan="4">3.3. Atividade pesqueira</th>
            </tr>
            <tr>
                <th>Atividade</th><td></td>
                <th>Subsistência / Venda</th>
                <td>
                <input type="checkbox" readOnly /> Subsistência
                <input type="checkbox" readOnly /> Venda
                </td>
            </tr>
            <tr>
                <th className="section" colSpan="4">3.4. Recolhimento de IPI sobre venda da produção</th>
            </tr>
            <tr>
                <th>Houve recolhimento de IPI?</th>
                <td colSpan="3">
                <input type="radio" name="ipi" readOnly /> SIM
                <input type="radio" name="ipi" readOnly /> NÃO
                <br />Período: (dd/mm/aaaa a dd/mm/aaaa)
                </td>
            </tr>
            <tr>
                <th className="section" colSpan="4">3.5. Possui empregado(s) ou prestador(es) de serviço</th>
            </tr>
            <tr>
                <th>Possui?</th>
                <td colSpan="3">
                <input type="radio" name="emp" readOnly /> SIM
                <input type="radio" name="emp" readOnly /> NÃO
                <br />Se sim: Nome / CPF / Período
                <div className="notes">
                    Observação: esta declaração deverá ser assinada pelo declarante em todas as suas páginas.
                </div>
                </td>
            </tr>
            <tr>
                <th className="section" colSpan="4">4. Outras atividades / rendas</th>
            </tr>
            <tr>
                <th>Atividade</th><th>Local</th><th>Período</th><th>Renda (R$) / Outras informações</th>
            </tr>
            <tr><td></td><td></td><td></td><td></td></tr>
            <tr>
                <th className="section" colSpan="4">4.1. Recebeu outra renda (ex.: atividade turística, mandato etc.)</th>
            </tr>
            <tr>
                <th>Recebeu?</th>
                <td colSpan="3">
                <input type="radio" name="outra_renda" readOnly /> SIM
                <input type="radio" name="outra_renda" readOnly /> NÃO
                <br />Atividade / Período / Renda / Observações
                </td>
            </tr>
            <tr>
                <th className="section" colSpan="4">4.2. Participa de cooperativa</th>
            </tr>
            <tr>
                <th>Participa?</th>
                <td colSpan="3">
                <input type="radio" name="coop" readOnly /> SIM
                <input type="radio" name="coop" readOnly /> NÃO
                <br />Entidade / CNPJ / Informar se é agropecuária ou de crédito rural
                </td>
            </tr>
            <tr>
                <th className="section" colSpan="4">Declaração</th>
            </tr>
            <tr>
                <td colSpan="4" className="notes">
                Declaro sob as penas previstas na legislação, que as informações prestadas nesta declaração são verdadeiras,
                estando ciente das penalidades do Art. 299 do Código Penal Brasileiro.
                </td>
            </tr>
            <tr>
                <th>Local</th><td></td>
                <th>Data</th><td></td>
            </tr>
            <tr>
                <th>Assinatura do segurado/requerente</th>
                <td colSpan="3"></td>
            </tr>
        </tbody>
        </table>
    </Container>
    );
});

export default DocumentoConteudo;
