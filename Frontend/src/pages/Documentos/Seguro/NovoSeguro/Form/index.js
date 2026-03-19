import React, { useState, useEffect } from "react";
import api from "../../../../../services/api";
import { cpfMask } from "../../../../../Utils/Masks";

export default function NovoSeguro(props) {
    const [pescador, setPescador] = useState({});
    const [enderecos, setEnderecos] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        apelido: "",
        local_nascimento: "",
        rg_data_expedicao: "",
        rg_local_expedicao: "",
        local_declaracao: "",
        data_declaracao: "",
        observacoes_gerais: "",
        condicao: "TITULAR", // valor padrão para não vir vazio

        atividade: [
            {
                // 2. Período de atividade pesca
                data_inicio: "",
                data_fim: "",
                local: "MAR",
                situacao: "INDIVIDUAL",
                condicao_grupo_familiar: "",
                observacoes: ""
            }
        ],
        familiares: [
            {
                nome: "",
                cpf: "",
                nascimento: "",
                estado_civil: "SOLTEIRO",
                parentesco: "",
                condicao: "COMPONENTE"
            }
        ],
        embarcacoes: [
            {
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
                subsistencia: "VENDA",


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
            }
        ], 
        outras_rendas: [
            {
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
        ]
    });
    const normalizeDate = (date) => {
        // Verifica se é nulo, vazio ou se a string resultante de um erro de parsing
        if (!date || date === "" || String(date).toLowerCase().includes("invalid")) {
            return null;
        }
        return date;
    };

    const normalizeNumber = (value) => {
        if (value === "" || value === null || value === undefined) return null;
        return Number(value);
    };

    const handleSave = async () => {
        if (!pescador?.id) {
            alert("Aguarde o carregamento do pescador.");
            return;
        }

        const objetoMestre = {
            pescador_id: pescador.id,
            entidade_id: 1,

            apelido: pescador.apelido || formData.apelido,
            local_nascimento: formData.local_nascimento || null,
            rg_data_expedicao: normalizeDate(formData.rg_data_expedicao),
            rg_local_expedicao: formData.rg_local_expedicao || null,
            local_declaracao: formData.local_declaracao || null,
            data_declaracao: normalizeDate(formData.data_declaracao),
            observacoes_gerais: formData.observacoes_gerais || null,

            // ATIVIDADE
            atividades: [
                {
                    ...formData.atividade,
                    data_inicio: normalizeDate(formData.atividade.data_inicio),
                    data_fim: normalizeDate(formData.atividade.data_fim),
                }
            ],

            // FAMILIARES DINÂMICOS
            familiares: formData.familiares
                .filter(f => f.nome && f.nome.trim() !== "")
                .map(f => ({
                    ...f,
                    nascimento: normalizeDate(f.nascimento)
                })),

            // EMBARCAÇÕES DINÂMICAS
            embarcacoes: formData.embarcacoes.map(e => ({
                ...e,

                data_inicio: normalizeDate(e.data_inicio),
                data_fim: normalizeDate(e.data_fim),

                data_inicio_proprietario: normalizeDate(e.data_inicio_proprietario),
                data_fim_proprietario: normalizeDate(e.data_fim_proprietario),

                data_inicio_titular: normalizeDate(e.data_inicio_titular),
                data_fim_titular: normalizeDate(e.data_fim_titular),

                data_inicio_ipi: normalizeDate(e.data_inicio_ipi),
                data_fim_ipi: normalizeDate(e.data_fim_ipi),

                data_inicio_empregados: normalizeDate(e.data_inicio_empregados),
                data_fim_empregados: normalizeDate(e.data_fim_empregados),

                arqueacao_bruta: normalizeNumber(e.arqueacao_bruta),
            })),

            // OUTRAS RENDAS DINÂMICAS
            rendas: formData.rendas.map(r => ({
                ...r,
                valor: normalizeNumber(r.valor)
            })),

            // INFORMAÇÕES COMPLEMENTARES
            rendas: {
                ...formData.rendas,

                data_inicio_outrarenda: normalizeDate(formData.rendas.data_inicio_outrarenda),
                data_fim_outrarenda: normalizeDate(formData.rendas.data_fim_outrarenda),

                renda_outrarenda: normalizeNumber(formData.rendas.renda_outrarenda)
            }
        };

        try {
            await api.post("/seguros", objetoMestre);
            alert("Seguro e todas as informações relacionadas foram salvos!");
        } catch (error) {
            console.error("Erro ao salvar:", error.response?.data || error);
            alert("Erro ao salvar. Verifique os campos obrigatórios.");
        }
    };
    // Carregar dados do pescador e endereços ao montar o componente
    useEffect(() => {
        async function loadData() {
            const id = props.match?.params?.id;
            if (!id) return;

            try {
                const [resPescador, resEndereco] = await Promise.all([
                    api.get(`/pescadores/${id}`),
                    api.get(`/pescadores/${id}/enderecos`)
                ]);

                setPescador(resPescador.data);
                setEnderecos(resEndereco.data);
            } catch (error) {
                console.error(error);
            }
        }

        loadData();
    }, [props.match?.params?.id]);

    // Função para atualizar campos do formulário
    function handleChange(e) {
        const { name, value } = e.target;
        // Suporte para campos aninhados (ex: atividade.data_inicio)
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    }

    // Função para enviar o formulário
    // 2. Unifique a lógica de salvamento no handleSubmit
    async function handleSubmit(e) {
        e.preventDefault();

        if (!pescador?.id) {
            alert("Aguarde o carregamento do pescador.");
            return;
        }

        const objetoMestre = {
            pescador_id: pescador.id,
            entidade_id: 1,
            apelido: formData.apelido || pescador.nome,
            local_nascimento: formData.local_nascimento,
            rg_data_expedicao: normalizeDate(formData.rg_data_expedicao),
            rg_local_expedicao: formData.rg_local_expedicao,
            local_declaracao: formData.local, 
            data_declaracao: normalizeDate(formData.data_assinatura),
            observacoes_gerais: formData.observacoes_gerais,

            // 2. ATIVIDADES
            atividades: [{
                ...formData.atividade,
                data_inicio: normalizeDate(formData.atividade.data_inicio),
                data_fim: normalizeDate(formData.atividade.data_fim),
                // 2.1 CONDIÇÃO NO GRUPO

            }],
            
            // 2.2 FAMILIARES
            familiares: formData.familiares.map(f => ({
                nome: f.nome,
                cpf: f.cpf,
                nascimento: normalizeDate(f.nascimento),
                estado_civil: f.estado_civil,
                parentesco: f.parentesco,
                condicao: f.condicao || "COMPONENTE"
            })),

            // 3. EMBARCAÇÕES
            embarcacoes: formData.embarcacoes.map(e => ({
                data_inicio: normalizeDate(e.data_inicio),
                data_fim: normalizeDate(e.data_fim),
                condicao: e.condicao,
                arqueacao_bruta: normalizeNumber(e.arqueacao_bruta),
                observacao_condicao: e.observacao_condicao,

                // 3.1 ArendamentoProprietário
                data_fim_proprietario: normalizeDate(e.data_fim_proprietario),
                data_inicio_proprietario: normalizeDate(e.data_inicio_proprietario),
                
                // 3.2 Nome e CPF do titular da embarcação
                nome_titular: e.nome_titular,
                cpf_titular: e.cpf_titular,
                data_inicio_titular: normalizeDate(e.data_inicio_titular),
                data_fim_titular: normalizeDate(e.data_fim_titular),
                observacao_titular: e.observacao_titular,

                // 3.3 Atividade pesqueira
                atividade: e.atividade,
                subsistencia: e.subsistencia,
                // não existe, subtitir no formvenda: e.venda,
                
                // 3.4 Recolhimento de IPI
                recolhimento_ipi: e.recolhimento_ipi,
                data_inicio_ipi: normalizeDate(e.data_inicio_ipi),
                data_fim_ipi: normalizeDate(e.data_fim_ipi),

                // 3.5 Dados da embarcação
                possui_empregados: e.possui_empregados,
                nome_empregados: e.nome_empregados,
                cpf_empregados: e.cpf_empregados,
                data_inicio_empregados: normalizeDate(e.data_inicio_empregados),
                data_fim_empregados: normalizeDate(e.data_fim_empregados)
            })),

            // 4. RENDAS (Aqui o nome deve ser 'rendas' para o Sequelize salvar)
            rendas: formData.outras_rendas.map(r => ({
                atividade: r.atividade,
                local: r.local,
                periodo: r.periodo,
                valor: normalizeNumber(r.valor),
                recebeu_outrarenda: r.recebeu_outrarenda,
                atividade_outrarenda: r.atividade_outrarenda,
                renda_outrarenda: normalizeNumber(r.renda_outrarenda),
                data_inicio_outrarenda: normalizeDate(r.data_inicio_outrarenda),
                data_fim_outrarenda: normalizeDate(r.data_fim_outrarenda),
                participa_cooperativa: r.participa_cooperativa,
                nome_cooperativa: r.nome_cooperativa,
                cnpj_cooperativa: r.cnpj_cooperativa,
                tipo_cooperativa: r.tipo_cooperativa
            }))
        };

        try {
            await api.post("/seguros", objetoMestre);
            alert("Seguro e todos os dependentes salvos com sucesso!");
        } catch (error) {
            console.error("Erro no envio:", error.response?.data || error);
            setErrorMessage("Erro ao salvar. Verifique os dados.");
        }
    }

    // Função para adicionar um novo familiar ao formulário
    function adicionarFamiliar() {
        setFormData(prev => ({
            ...prev,
            familiares: [
                ...prev.familiares,
                {
                    nome: "",
                    nascimento: "",
                    cpf: "",
                    estado_civil: "",
                    parentesco: ""
                }
            ]
        }));
    }

    // Função para remover um familiar do formulário
    function removerFamiliar(index) {
        const novos = [...formData.familiares];
        novos.splice(index, 1);

        setFormData({
            ...formData,
            familiares: novos
        });
    }

    // Atualizar campo do familiar
    function handleFamiliarChange(index, campo, valor) {
        const novos = [...formData.familiares];
        novos[index][campo] = valor;
        setFormData({
            ...formData,
            familiares: novos
        });
    }

    // Função para adicionar uma nova embarcação
    function adicionarEmbarcacao() {
        setFormData(prev => ({
            ...prev,
            embarcacoes: [
                ...prev.embarcacoes,
                {
                    data_inicio: "",
                    data_fim: "",
                    condicao: "",
                    arqueacao_bruta: "",
                    observacoes: "",

                    data_inicio_proprietario: "",
                    data_fim_proprietario: "",

                    nome_titular: "",
                    cpf_titular: "",
                    data_inicio_titular: "",
                    data_fim_titular: "",
                    observacao_titular: "",

                    atividade: "",
                    subsistencia: false,

                    recolhimento_ipi: null,
                    data_inicio_ipi: "",
                    data_fim_ipi: "",

                    possui_empregados: null,
                    nome_empregados: "",
                    cpf_empregados: "",
                    data_inicio_empregados: "",
                    data_fim_empregados: ""
                }
            ]
        }));
    }

    // Remover embarcação
    function removerEmbarcacao(index) {
        const novas = [...formData.embarcacoes];
        novas.splice(index, 1);

        setFormData({
            ...formData,
            embarcacoes: novas
        });
    }

    // atualizar campo da embarcação
    function handleEmbarcacaoChange(index, campo, valor) {
        const novas = [...formData.embarcacoes];

        novas[index][campo] = valor;

        setFormData({
            ...formData,
            embarcacoes: novas
        });
    }

    // Função para adicionar outra renda
    const handleOutraRendaChange = (index, field, value) => {
        const novas = [...formData.outras_rendas];
        novas[index][field] = value;

        setFormData({
            ...formData,
            outras_rendas: novas
        });
    };

    // Função para adicionar outra renda
    const adicionarOutraRenda = () => {
        setFormData({
            ...formData,
            outras_rendas: [
            ...formData.outras_rendas,
            { atividade: "", local: "", periodo: "", valor: "" }
            ]
        });
    };

    // Função para remover outra renda
    const removerOutraRenda = (index) => {
        const novas = formData.outras_rendas.filter((_, i) => i !== index);

        setFormData({
            ...formData,
            outras_rendas: novas
        });
    };

    return (
        <div className="container">
            {errorMessage && (
                <div className="alert alert-danger mt-3 text-center">
                    {errorMessage}
                </div>
            )}

            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* Dados do Segurado */}
                        <h4 className="mb-3">Dados do Segurado</h4>

                        {/* NOME + APELIDO */}
                        <div className="row">
                            <div className="col-md-6">
                                <label>Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={pescador.nome || ""}
                                    disabled
                                />
                            </div>

                            <div className="col-md-6">
                                <label>Apelido</label>
                                <input
                                    type="text"
                                    name="apelido"
                                    className="form-control"
                                    value={formData.apelido || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* CPF + LOCAL NASCIMENTO */}
                        <div className="row mt-3">
                            <div className="col-md-4">
                                <label>CPF</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={cpfMask(pescador.cpf || "")}
                                    disabled
                                />
                            </div>

                            <div className="col-md-4">
                                <label>Local de Nascimento</label>
                                <input
                                    type="text"
                                    name="local_nascimento"
                                    className="form-control"
                                    value={formData.local_nascimento || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4">
                                <label>Data Assinatura</label>
                                <input
                                    type="date"
                                    name="data_assinatura"
                                    className="form-control"
                                    value={formData.data_assinatura || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* RG */}
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <label>Data de Expedição do RG</label>
                                <input
                                    type="date"
                                    name="rg_data_expedicao"
                                    className="form-control"
                                    value={formData.rg_data_expedicao || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label>Local de Expedição do RG</label>
                                <input
                                    type="text"
                                    name="rg_local_expedicao"
                                    className="form-control"
                                    value={formData.rg_local_expedicao || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* LOCAL DO DOCUMENTO */}
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <label>Local da Assinatura</label>
                                <input
                                    type="text"
                                    name="local"
                                    className="form-control"
                                    value={formData.local || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <hr className="my-4" />

                        <h4 className="mb-3">Observações</h4>

                        <div className="row">
                            <div className="col-12">
                                <textarea
                                    name="observacoes_gerais"
                                    className="form-control"
                                    rows="4"
                                    value={formData.observacoes_gerais || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Periodo de Atividade de pesca */}
                        <hr className="my-4" />

                        <h4 className="mb-3">2. Período(s) de atividade de pesca</h4>

                        <div className="row">
                            <div className="col-md-6">
                                <label>Data início</label>
                                <input
                                    type="date"
                                    name="atividade.data_inicio"
                                    className="form-control"
                                    value={formData.atividade?.data_inicio || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label>Data fim</label>
                                <input
                                    type="date"
                                    name="atividade.data_fim"
                                    className="form-control"
                                    value={formData.atividade?.data_fim || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-4">
                                <label>Local da atividade</label>
                                <select
                                    name="atividade.local"
                                    className="form-control"
                                    value={formData.atividade?.local || ""}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="MAR">Mar</option>
                                    <option value="RIO">Rio</option>
                                    <option value="ESTUARIO">Estuário</option>
                                    <option value="LAGOA">Lagoa</option>
                                    <option value="ACUDE">Açude</option>
                                    <option value="REPRESA">Represa</option>
                                </select>
                            </div>
                            {/**
                             * esse aqui porra
                             */}
                            <div className="col-md-4">
                                <label>Situação</label>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        name="atividade.situacao"
                                        value="INDIVIDUAL"
                                        className="form-check-input"
                                        checked={formData.atividade?.situacao === "INDIVIDUAL"}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">
                                        Individualmente
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        name="atividade.situacao"
                                        value="ECONOMIA_FAMILIAR"
                                        className="form-check-input"
                                        checked={formData.atividade?.situacao === "ECONOMIA_FAMILIAR"}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">
                                        Economia Familiar
                                    </label>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <label>Observações</label>
                                <input
                                    type="text"
                                    name="atividade.observacoes"
                                    className="form-control"
                                    value={formData.atividade?.observacoes || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Seção 2.1 - Condição no grupo */}
                        <hr className="my-4" />

                        <h4 className="mb-3">2.1 Condição no grupo (economia familiar)</h4>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        name="atividade.condicao_grupo_familiar"
                                        value="TITULAR"
                                        className="form-check-input"
                                        checked={formData.atividade.condicao_grupo_familiar === "TITULAR"}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">
                                        Titular
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        name="atividade.condicao_grupo_familiar"
                                        value="COMPONENTE"
                                        className="form-check-input"
                                        checked={formData.atividade.condicao_grupo_familiar === "COMPONENTE"}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">
                                        Componente
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Seção 2.2 - Grupo familiar */}
                        <hr className="my-4" />

                        <h4 className="mb-3">2.2 Grupo Familiar</h4>

                        {formData.familiares.map((familiar, index) => (
                            <div key={index} className="card mb-3">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-2">
                                        <strong>Familiar {index + 1}</strong>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => removerFamiliar(index)}
                                        >
                                            Remover
                                        </button>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>Nome</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={familiar.nome}
                                                onChange={(e) =>
                                                    handleFamiliarChange(index, "nome", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label>Data Nascimento</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={familiar.nascimento}
                                                onChange={(e) =>
                                                    handleFamiliarChange(index, "nascimento", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label>CPF</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={familiar.cpf}
                                                onChange={(e) =>
                                                    handleFamiliarChange(index, "cpf", cpfMask(e.target.value))
                                                }
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <label>Estado Civil</label>
                                            <select
                                                className="form-control"
                                                value={familiar.estado_civil}
                                                onChange={(e) =>
                                                    handleFamiliarChange(index, "estado_civil", e.target.value)
                                                }
                                            >
                                                <option value="">Selecione</option>
                                                <option value="SOLTEIRO">Solteiro</option>
                                                <option value="CASADO">Casado</option>
                                                <option value="DIVORCIADO">Divorciado</option>
                                                <option value="VIUVO">Viúvo</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-4">
                                            <label>Parentesco</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={familiar.parentesco}
                                                onChange={(e) =>
                                                    handleFamiliarChange(index, "parentesco", e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={adicionarFamiliar}
                        >
                            + Adicionar
                        </button>
                        {/* 3 Condição em relação a embarcação */}
                        <hr className="my-4" />

                        <h4 className="mb-3">3. Condição em relação à embarcação</h4>

                        {formData.embarcacoes.map((embarcacao, index) => (
                            <div key={index} className="card mb-4">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-3">
                                        <strong>Embarcação {index + 1}</strong>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => removerEmbarcacao(index)}
                                        >
                                            Remover
                                        </button>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-3">
                                            <label>Data início</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={embarcacao.data_inicio}
                                                onChange={e =>
                                                    handleEmbarcacaoChange(index, "data_inicio", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label>Data fim</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={embarcacao.data_fim}
                                                onChange={e =>
                                                    handleEmbarcacaoChange(index, "data_fim", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label>Condição</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={embarcacao.condicao}
                                                onChange={e =>
                                                    handleEmbarcacaoChange(index, "condicao", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label>Arqueação Bruta</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={embarcacao.arqueacao_bruta}
                                                onChange={e =>
                                                    handleEmbarcacaoChange(index, "arqueacao_bruta", e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Observações</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={embarcacao.observacoes}
                                                onChange={e =>
                                                    handleEmbarcacaoChange(index, "observacoes", e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <hr />
                                    <h6>3.1. Arrendamento (se proprietário)</h6>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label>Data inicio</label>
                                            <input 
                                                type="date"
                                                className="form-control"
                                                value={embarcacao.data_inicio_proprietario}
                                                onChange={e =>
                                                    handleEmbarcacaoChange(index, "data_inicio_proprietario", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label>Data fim</label>
                                            <input 
                                                type="date"
                                                className="form-control"
                                                value={embarcacao.data_fim_proprietario}
                                                onChange={e =>
                                                    handleEmbarcacaoChange(index, "data_fim_proprietario", e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                    <h6>3.2 Titular da embarcação</h6>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>Nome</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={embarcacao.nome_titular}
                                                onChange={e =>
                                                    handleEmbarcacaoChange(index, "nome_titular", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label>CPF</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={embarcacao.cpf_titular}
                                                onChange={e =>
                                                    handleEmbarcacaoChange(index, "cpf_titular", cpfMask(e.target.value))
                                                }
                                            />
                                        </div>
                                        
                                        <div className="row mt-3">
                                            <div className="col-md-3">
                                                <label>Data inicio</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    value={embarcacao.data_inicio_titular}
                                                    onChange={e =>
                                                        handleEmbarcacaoChange(index, "data_inicio_titular", e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label>Data fim</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    value={embarcacao.data_fim_titular}
                                                    onChange={e =>
                                                        handleEmbarcacaoChange(index, "data_fim_titular", e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-6">
                                            <label>Observações</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={embarcacao.observacao_titular}
                                                onChange={e =>
                                                    handleEmbarcacaoChange(index, "observacao_titular", e.target.value)
                                                }
                                            />
                                            </div>
                                        </div>
                                    </div>

                                    <hr />

                                    <h6>3.3 Atividade pesqueira</h6>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>Atividade</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={embarcacao.atividade}
                                                onChange={e =>
                                                    handleEmbarcacaoChange(index, "atividade", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="d-block">Subsistência / Venda</label>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    name={`subsistencia-${index}`} // Nome único por linha da tabela
                                                    value="SUBSISTENCIA"
                                                    checked={embarcacao.subsistencia === "SUBSISTENCIA"}
                                                    onChange={e => handleEmbarcacaoChange(index, "subsistencia", e.target.value)}
                                                />
                                                <label className="form-check-label">Subsistência</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    name={`subsistencia-${index}`}
                                                    value="VENDA"
                                                    checked={embarcacao.subsistencia === "VENDA"}
                                                    onChange={e => handleEmbarcacaoChange(index, "subsistencia", e.target.value)}
                                                />
                                                <label className="form-check-label">Venda</label>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />

                                    <h6>3.4 Recolhimento IPI</h6>
                                    <label>
                                        <input
                                            type="radio"
                                            checked={embarcacao.recolhimento_ipi === true}
                                            onChange={() =>
                                                handleEmbarcacaoChange(index, "recolhimento_ipi", true)
                                            }
                                        />
                                        Sim
                                    </label>
                                    <label style={{ marginLeft: "10px" }}>
                                        <input
                                            type="radio"
                                            checked={embarcacao.recolhimento_ipi === false}
                                            onChange={() =>
                                                handleEmbarcacaoChange(index, "recolhimento_ipi", false)
                                            }
                                        />
                                        Não
                                    </label>
                                    {embarcacao.recolhimento_ipi === true && (
                                        <div className="row mt-2">
                                            <div className="col-md-3">
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    value={embarcacao.data_inicio_ipi}
                                                    onChange={e =>
                                                        handleEmbarcacaoChange(index, "data_inicio_ipi", e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    value={embarcacao.data_fim_ipi}
                                                    onChange={e =>
                                                        handleEmbarcacaoChange(index, "data_fim_ipi", e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <hr />

                                    <h6>3.5 Possui empregados</h6>
                                    <label>
                                        <input
                                            type="radio"
                                            checked={embarcacao.possui_empregados === true}
                                            onChange={() =>
                                                handleEmbarcacaoChange(index, "possui_empregados", true)
                                            }
                                        />
                                        Sim
                                    </label>
                                    <label style={{ marginLeft: "10px" }}>
                                        <input
                                            type="radio"
                                            checked={embarcacao.possui_empregados === false}
                                            onChange={() =>
                                                handleEmbarcacaoChange(index, "possui_empregados", false)
                                            }
                                        />
                                        Não
                                    </label>
                                    {embarcacao.possui_empregados === true && (
                                        <div className="row mt-3">
                                            <div className="col-md-4">
                                                <label>Nome</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={embarcacao.nome_empregados}
                                                    onChange={e =>
                                                        handleEmbarcacaoChange(index, "nome_empregados", e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label>CPF</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={embarcacao.cpf_empregados}
                                                    onChange={e =>
                                                        handleEmbarcacaoChange(index, "cpf_empregados", cpfMask(e.target.value))
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label>Período</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    value={embarcacao.data_inicio_empregados}
                                                    onChange={e =>
                                                        handleEmbarcacaoChange(index, "data_inicio_empregados", e.target.value)
                                                    }
                                                />
                                                <input
                                                    type="date"
                                                    className="form-control mt-1"
                                                    value={embarcacao.data_fim_empregados}
                                                    onChange={e =>
                                                        handleEmbarcacaoChange(index, "data_fim_empregados", e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={adicionarEmbarcacao}
                        >
                            + Adicionar
                        </button>

                        {/* 4 Outras atividades / rendas */}
                        <hr className="my-4" />

                        <h4 className="mb-3">4. Outras atividades / rendas</h4>

                        {formData.outras_rendas.map((renda, index) => (
                        <div key={index} className="card mb-4">
                            <div className="card-body">

                            <div className="d-flex justify-content-between mb-3">
                                <strong>Renda {index + 1}</strong>

                                <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => removerOutraRenda(index)}
                                >
                                Remover
                                </button>
                            </div>

                            <div className="row">
                                <div className="col-md-3">
                                <label>Atividade</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={renda.atividade}
                                    onChange={(e) =>
                                    handleOutraRendaChange(index, "atividade", e.target.value)
                                    }
                                />
                                </div>

                                <div className="col-md-3">
                                <label>Local</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={renda.local}
                                    onChange={(e) =>
                                    handleOutraRendaChange(index, "local", e.target.value)
                                    }
                                />
                                </div>

                                <div className="col-md-3">
                                <label>Período</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={renda.periodo}
                                    onChange={(e) =>
                                    handleOutraRendaChange(index, "periodo", e.target.value)
                                    }
                                />
                                </div>

                                <div className="col-md-3">
                                <label>Valor</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={renda.valor}
                                    onChange={(e) =>
                                    handleOutraRendaChange(index, "valor", e.target.value)
                                    }
                                />
                                </div>
                            </div>

                            <hr />

                            <h6>4.1 Recebeu outra renda</h6>

                            <label>
                                <input
                                type="radio"
                                checked={renda.recebeu_outrarenda === true}
                                onChange={() =>
                                    handleOutraRendaChange(index, "recebeu_outrarenda", true)
                                }
                                />
                                Sim
                            </label>

                            <label style={{ marginLeft: "10px" }}>
                                <input
                                type="radio"
                                checked={renda.recebeu_outrarenda === false}
                                onChange={() =>
                                    handleOutraRendaChange(index, "recebeu_outrarenda", false)
                                }
                                />
                                Não
                            </label>

                            {renda.recebeu_outrarenda === true && (
                                <div className="row mt-3">
                                <div className="col-md-4">
                                    <label>Atividade</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    value={renda.atividade_outrarenda}
                                    onChange={(e) =>
                                        handleOutraRendaChange(
                                        index,
                                        "atividade_outrarenda",
                                        e.target.value
                                        )
                                    }
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label>Valor</label>
                                    <input
                                    type="number"
                                    className="form-control"
                                    value={renda.renda_outrarenda}
                                    onChange={(e) =>
                                        handleOutraRendaChange(
                                        index,
                                        "renda_outrarenda",
                                        e.target.value
                                        )
                                    }
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label>Período</label>
                                    <input
                                    type="date"
                                    className="form-control"
                                    value={renda.data_inicio_outrarenda}
                                    onChange={(e) =>
                                        handleOutraRendaChange(
                                        index,
                                        "data_inicio_outrarenda",
                                        e.target.value
                                        )
                                    }
                                    />

                                    <input
                                    type="date"
                                    className="form-control mt-1"
                                    value={renda.data_fim_outrarenda}
                                    onChange={(e) =>
                                        handleOutraRendaChange(
                                        index,
                                        "data_fim_outrarenda",
                                        e.target.value
                                        )
                                    }
                                    />
                                </div>
                                </div>
                            )}

                            <hr />

                            <h6>4.2 Participa de cooperativa</h6>

                            <label>
                                <input
                                type="radio"
                                checked={renda.participa_cooperativa === true}
                                onChange={() =>
                                    handleOutraRendaChange(index, "participa_cooperativa", true)
                                }
                                />
                                Sim
                            </label>

                            <label style={{ marginLeft: "10px" }}>
                                <input
                                type="radio"
                                checked={renda.participa_cooperativa === false}
                                onChange={() =>
                                    handleOutraRendaChange(index, "participa_cooperativa", false)
                                }
                                />
                                Não
                            </label>

                            {renda.participa_cooperativa === true && (
                                <div className="row mt-3">
                                <div className="col-md-4">
                                    <label>Nome da cooperativa</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    value={renda.nome_cooperativa}
                                    onChange={(e) =>
                                        handleOutraRendaChange(
                                        index,
                                        "nome_cooperativa",
                                        e.target.value
                                        )
                                    }
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label>CNPJ</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    value={renda.cnpj_cooperativa}
                                    onChange={(e) =>
                                        handleOutraRendaChange(
                                        index,
                                        "cnpj_cooperativa",
                                        e.target.value
                                        )
                                    }
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label>Tipo</label>
                                    <select
                                    className="form-control"
                                    value={renda.tipo_cooperativa}
                                    onChange={(e) =>
                                        handleOutraRendaChange(
                                        index,
                                        "tipo_cooperativa",
                                        e.target.value
                                        )
                                    }
                                    >
                                    <option value="">Selecione</option>
                                    <option value="AGROPECUARIA">Agropecuária</option>
                                    <option value="CREDITO_RURAL">Crédito Rural</option>
                                    </select>
                                </div>
                                </div>
                            )}
                            </div>
                        </div>
                        ))}

                        <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={adicionarOutraRenda}
                        >
                        + Adicionar
                        </button>

                        {/* Botão de submit */}
                        <div className="row mt-4">
                            <div className="col-md-4 offset-md-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{ width: "100%" }}
                                >
                                    Salvar Seguro
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
