import React, { forwardRef, useEffect, useState  } from "react";
import { Container } from "./styles";
import brasao from "./assets/image.jpg";
import api from "../../../../services/api";
import { dateFormat } from "../../../../Utils";

const DocumentoConteudo = forwardRef((props, ref) => {
    const [seguro, setSeguro] = useState(null);
    const [pescador, setPescador] = useState(null);
    const [enderecos, setEnderecos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Carrega os dados pois o ID vem pela URL e não é passado como prop
    useEffect(() => {
        async function loadDadosCompletos() {
            // O ID agora é o do Seguro (s.id) vindo da URL
            const id = props.id || 
                    props.match?.params?.id || 
                    window.location.pathname.split("/").pop();

            if (!id || id === "undefined") {
                console.error("ID detectado:", id);
                return;
            }

            try {
                // 1. Busca o Seguro primeiro
                const resSeguro = await api.get(`/seguros/${id}`);
                setSeguro(resSeguro.data);

                // 2. Com o pescador_id de dentro do seguro, busca o Pescador e Endereço
                const pescadorId = resSeguro.data.pescador_id;
                
                const [resPescador, resEndereco] = await Promise.all([
                    api.get(`/pescadores/${pescadorId}`),
                    api.get(`/pescadores/${pescadorId}/enderecos`)
                ]);

                setPescador(resPescador.data);
                setEnderecos(resEndereco.data);
            } catch (error) {
                console.error("Erro na API:", error);
            } finally {
                setLoading(false);
            }
        }

        loadDadosCompletos();
    }, [props.id, props.match]);
    
    if (loading) return <div style={{padding: 20}}>Carregando documento...</div>;
    
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
                <td>{seguro?.apelido}</td>
            </tr>
            <tr>
                <th>Data de Nascimento (DN):</th>
                <td>{dateFormat(pescador?.nascimento)}</td>
                <th>Local de Nascimento:</th>
                <td>{dateFormat(pescador?.nascimento)}</td>
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
                <th>Data/Local de Expedição (RG):</th>
                <td>{dateFormat(seguro?.rg_data_expedicao)} / {seguro?.rg_local_expedicao}</td>
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
            {seguro?.atividades?.map((at, index) => (
                <tr key={index}>
                    <td>{dateFormat(at.data_inicio)} a {dateFormat(at.data_fim) || 'Atual'}</td>
                    <td>{at.local}</td>
                    <td>
                        <input type="checkbox" checked={at.situacao === "INDIVIDUAL"} readOnly /> Individualmente<br />
                        <input type="checkbox" checked={at.situacao === "ECONOMIA_FAMILIAR"} readOnly /> Regime de economia familiar
                    </td>
                    <td>{at.observacoes}</td>
                </tr>
            ))}
           
            <tr>
                <th className="section" colSpan="4">2.1. Condição no grupo (economia familiar)</th>
            </tr>
            <tr>
                <th>Condição</th>
                <td colSpan="3">
                    <input type="radio" checked={seguro?.atividades?.[0]?.condicao_grupo_familiar === "TITULAR"} readOnly /> Titular
                    <input type="radio" checked={seguro?.atividades?.[0]?.condicao_grupo_familiar === "COMPONENTE"} readOnly /> Componente
                </td>
            </tr>
            <tr>
                <th className="section" colSpan="4">2.2. Grupo Familiar (quando aplicável)</th>
            </tr>
            {seguro?.familiares && seguro.familiares.length > 0 ? (
                seguro.familiares.map((f, index) => (
                    <React.Fragment key={index}>
                        <tr>
                            <th>Nome:</th>
                            <td className="wide">{f.nome}</td>
                            <th>Data Nasc (DN):</th>
                            <td>{dateFormat(f.nascimento)}</td>
                        </tr>
                        <tr>
                            <th>CPF:</th>
                            <td>{f.cpf}</td>
                            <td colSpan="2"></td> {/* Espaço vazio para manter o alinhamento */}
                        </tr>
                        <tr>
                            <th>Estado Civil:</th>
                            <td>{f.estado_civil}</td>
                            <th>Parentesco:</th>
                            <td>{f.parentesco}</td>
                        </tr>
                    </React.Fragment>
                ))
            ) : (
                /* Caso não existam familiares, exibe as linhas vazias padrão do formulário */
                <>
                    <tr>
                        <th>Nome:</th><td></td>
                        <th>Data Nasc (DN):</th><td></td>
                    </tr>
                    <tr>
                        <th>CPF:</th><td></td>
                        <th>Estado Civil:</th><td></td>
                    </tr>
                    <tr>
                        <th>Parentesco:</th><td colSpan="3"></td>
                    </tr>
                    <tr>
                        <th>Nome:</th><td></td>
                        <th>Data Nasc (DN):</th><td></td>
                    </tr>
                    <tr>
                        <th>CPF:</th><td></td>
                        <th>Estado Civil:</th><td></td>
                    </tr>
                    <tr>
                        <th>Parentesco:</th><td colSpan="3"></td>
                    </tr>
                    <tr>
                        <th>Nome:</th><td></td>
                        <th>Data Nasc (DN):</th><td></td>
                    </tr>
                    <tr>
                        <th>CPF:</th><td></td>
                        <th>Estado Civil:</th><td></td>
                    </tr>
                    <tr>
                        <th>Parentesco:</th><td colSpan="3"></td>
                    </tr>
                </>
            )}
            {/**
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
             
            */}
            <tr>
                <th className="section" colSpan="4">3. Condição em relação à embarcação</th>
            </tr>
            <tr>
                <th>Período (dd/mm/aaaa a dd/mm/aaaa):</th>
                <th>Condição em relação à embarcação*:</th>
                <th>Arqueação bruta (AB):</th>
                <th>Observações:</th>
            </tr>
            {seguro?.embarcacoes && seguro.embarcacoes.length > 0 ? (
                seguro.embarcacoes.map((embarcacao, index) => (
                    <React.Fragment key={index}>
                        <tr>
                            <td>
                                {/* Verifica se a data_inicio existe primeiro */}
                                {embarcacao.data_inicio ? dateFormat(embarcacao.data_inicio) : "__/__/____"} 
                                {" a "} 
                                {/* Se data_fim for null, exibe 'Atual' ou 'Em aberto' */}
                                {embarcacao.data_fim ? dateFormat(embarcacao.data_fim) : "__/__/____"}
                            </td>
                            <td>{embarcacao.condicao}</td>
                            <td>{embarcacao.arqueacao_bruta}</td>
                            <td>{embarcacao.observacao_condicao}</td>
                        </tr>
                        <tr>
                            <th className="section" colSpan="4">3.1. Arrendamento (se proprietário)</th>
                        </tr>
                        <tr>
                            <th>Período:</th>
                            <td colSpan="3">
                                {/* Verifica se a data_inicio existe primeiro */}
                                {embarcacao.data_inicio_proprietario ? dateFormat(embarcacao.data_inicio_proprietario) : "__/__/____"} 
                                {" a "} 
                                {/* Se data_fim for null, exibe 'Atual' ou 'Em aberto' */}
                                {embarcacao.data_fim_proprietario ? dateFormat(embarcacao.data_fim_proprietario) : "__/__/____"}
                            </td>
                        </tr>
                        <tr>
                            <th className="section" colSpan="4">3.2. Nome e CPF do(s) titular(es) da embarcação</th>
                        </tr>
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Período</th>
                            <th>Observações</th>
                        </tr>
                        <tr>
                            <td>{embarcacao.nome_titular}</td>
                            <td>{embarcacao.cpf_titular}</td>
                            <td>
                                {/* Verifica se a data_inicio existe primeiro */}
                                {embarcacao.data_inicio_titular ? dateFormat(embarcacao.data_inicio_titular) : "__/__/____"} 
                                <span>
                                    a
                                </span>
                                {/* Se data_fim for null, exibe 'Atual' ou 'Em aberto' */}
                                {embarcacao.data_fim_titular ? dateFormat(embarcacao.data_fim_titular) : "__/__/____"}
                            </td>
                            <td>{embarcacao.observacao_titular}</td>
                        </tr>
                        <tr>
                            <th className="section" colSpan="4">3.3. Atividade pesqueira</th>
                        </tr>
                        <tr>
                            <th>Atividade</th>
                            <td>{embarcacao.atividade}</td>
                            <th>Subsistência / Venda</th>
                            <td>
                            <input type="checkbox" checked={embarcacao.subsistencia === true || embarcacao.subsistencia === "SUBSISTENCIA"} readOnly /> Subsistência
                            <br/>
                            <input type="checkbox" checked={embarcacao.subsistencia === true || embarcacao.subsistencia === "VENDA"} readOnly /> Venda
                            </td>
                        </tr>
                        <tr>
                            <th className="section" colSpan="4">3.4. Recolhimento de IPI sobre venda da produção</th>
                        </tr>
                        <tr>
                            <th>Houve recolhimento de IPI?</th>
                            <td colSpan="3">
                            <input type="radio" name="ipi" checked={embarcacao.recolhimento_ipi === true} readOnly /> SIM
                            <input type="radio" name="ipi" checked={embarcacao.recolhimento_ipi === false} readOnly /> NÃO
                            <br />Período: {embarcacao.data_inicio_ipi ? `${dateFormat(embarcacao.data_inicio_ipi)} a ${dateFormat(embarcacao.data_fim_ipi)}` : "(__/__/___ a __/__/___)"}
                            </td>
                        </tr>
                        <tr>
                            <th className="section" colSpan="4">3.5. Possui empregado(s) ou prestador(es) de serviço</th>
                        </tr>
                        <tr>
                            <th>Possui?</th>
                            <td colSpan="3">
                            <input type="radio" name="emp" checked={embarcacao.possui_empregados === true} readOnly /> SIM
                            <input type="radio" name="emp" checked={embarcacao.possui_empregados === false} readOnly /> NÃO
                            <br />
                            {embarcacao.possui_empregados === true ? (
                                <>
                                    {embarcacao.nome_empregados|| ""} / {embarcacao.cpf_empregados || ""} / {embarcacao.data_inicio_empregados ? dateFormat(embarcacao.data_inicio_empregados) : ""} a {embarcacao.data_fim_empregados ? dateFormat(embarcacao.data_fim_empregados) : ""}
                                </>
                            ): (
                                <>Se sim: Nome / CPF / Período</>
                            )}
                            
                            <div className="notes">
                                Observação: esta declaração deverá ser assinada pelo declarante em todas as suas páginas.
                            </div>
                            </td>
                        </tr>
                    </React.Fragment>
                ))
            ) : null}
            {/**
             * <tr>
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
             */}
            <tr>
                <th className="section" colSpan="4">4. Outras atividades / rendas</th>
            </tr>
            {seguro?.rendas && seguro.rendas.length > 0 ? (
                seguro.rendas.map((renda, index) => (
                    <React.Fragment key={index}>
                        <tr>
                            <th>Atividade</th><th>Local</th><th>Período</th><th>Renda (R$) / Outras informações</th>
                        </tr>
                        <tr>
                            <td>{renda.atividade}</td>
                            <td>{renda.local}</td>
                            <td>{renda.data_inicio_renda ? dateFormat(renda.data_inicio_renda) : "__/__/____"} a {renda.data_fim_renda ? dateFormat(renda.data_fim_renda) : "__/__/____"}</td>
                            <td>{renda.renda ? `R$ ${renda.renda}` : ""}</td>
                        </tr>
                        <tr>
                            <th className="section" colSpan="4">4.1. Recebeu outra renda (ex.: atividade turística, mandato etc.)</th>
                        </tr>
                        <tr>
                            <th>Recebeu?</th>
                            <td colSpan="3">
                            <input type="radio" name="outra_renda" checked={renda.recebeu_outrarenda === true} readOnly /> SIM
                            <input type="radio" name="outra_renda" checked={renda.recebeu_outrarenda === false} readOnly /> NÃO
                            <br/>
                            {renda.recebeu_outrarenda === true ? (
                                <>
                                    {renda.atividade_outrarenda} / {renda.data_inicio_outrarenda ? dateFormat(renda.data_inicio_outrarenda) : "__/__/____"} a {renda.data_fim_outrarenda ? dateFormat(renda.data_fim_outrarenda) : "__/__/____"} / R$ {renda.renda_outrarenda} / {renda.observacao_outrarenda}
                                </>
                            ) : (
                                "Atividade / Período / Renda / Observações"
                            )}
                            </td>
                        </tr>
                        <tr>
                            <th className="section" colSpan="4">4.2. Participa de cooperativa</th>
                        </tr>
                        <tr>
                            <th>Participa?</th>
                            <td colSpan="3">
                            <input type="radio" name="coop" checked={renda.participa_cooperativa === true} readOnly /> SIM
                            <input type="radio" name="coop" checked={renda.participa_cooperativa === false} readOnly /> NÃO
                            <br />
                            {renda.participa_cooperativa === true ? (
                                <>
                                    {renda.nome_cooperativa} / {renda.cnpj_cooperativa} / {renda.tipo_cooperativa}
                                </>
                            ) : (
                                "Entidade / CNPJ / Informar se é agropecuária ou de crédito rural"
                            )}
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
                            <th>Local</th><td>{seguro?.local_declaracao}</td>
                            <th>Data</th><td>{seguro?.data_declaracao ? dateFormat(seguro.data_declaracao) : "____/____/____"}</td>
                        </tr>
                    </React.Fragment>
                ))
            ) : (
                <>
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
                </>
            )}
            {/**
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
             */}
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
