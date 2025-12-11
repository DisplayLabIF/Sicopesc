import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import { Container, FormSearch } from "./styles";

import {
  FaSearch,
  FaAddressCard,
  FaUser,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaEye,
  FaTrash,
  FaMoneyBill,
  FaAngleLeft,
  FaAngleRight,
  FaForward,
  FaBackward,
} from "react-icons/fa";
import { PulseLoader } from "react-spinners";
import queryString from "query-string";
//import Pagination from "react-js-pagination";
import InputMask from "react-input-mask";

import api from "../../services/api";
import { Link } from "react-router-dom";
import { dateFormat } from "../../Utils";
import { Modal } from "react-bootstrap";
import Pagination from "react-js-pagination";
//import { PaginationInfo } from "../pescador/styles";

function Anuidade(props) {
  const {title = ""} = props;

  const [guias, setGuias] = useState([]);
  const [nomePescador, setNomePescador] = useState("");
  const [, setLoading] = useState(false);
  const [search, setSearch] = useState(false);

  const [page, setPage] = useState(1);
  const [idGuia, setIdGuia] = useState(null);
  const [pagination, setPagination] = useState({
    itemCount: 0,
    pageCount: 0,
    pages: 0,
    currentPage: 1,
  });

  const [rgp, setRgp] = useState("");
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState(250);
  const [ano, setAno] = useState(2020);
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [pescador, setPescador] = useState(null);

  const [optionsAnos, setOptionsAnos] = useState(["2019", "2020", "2021"]);

  const [loadingGuia, setLoadingGuia] = useState(false);

  useEffect(() => {
    async function getAnuidades() {
      try {
        const response = await api.get(`/guias?page=${page}`);
        setGuias(response.data.guias);
        setPagination({
          itemCount: response.data.itemCount,
          pageCount: response.data.pageCount,
          pages: response.data.pages,
          currentPage: response.data.currentPage,
        });
        setLoading(false);
      } catch (e) {
        //setToLogin(true);
      }
    }
    if (!search) getAnuidades();
  }, [page, search]);

  useEffect(() => {
    const values = queryString.parse(props.location.search);
    let p = values.page;
    const search = values.search;
    if (p) {
      setPage(p);
    }
    setSearch(search);
  }, [props.location.search]);

  useEffect(() => {
    async function getGuiasByName() {
      setLoading(true);
      const data = (await api.get(`/guias/nome/${search}?page=${page}`)).data;
      setGuias(data.guias);
      setPagination({
        itemCount: data.itemCount,
        pageCount: data.pageCount,
        pages: data.pages,
        currentPage: data.currentPage,
      });
      setLoading(false);
    }
    if (search) getGuiasByName();
  }, [page, search]);

  async function deleteGuia(e) {
    setDeleting(true);
    try {
      await api.delete(`/guias/${idGuia}`);
    } catch (e) {}
    setDeleting(false);
    setShowModalExcluir(false);
    window.location.reload();
  }

  async function getGuiasByNome(e) {
    e.preventDefault();
    setPage(1);
    if (nomePescador === "") return props.history.push(`/anuidade`);
    return props.history.push(`/anuidade?search=${nomePescador}`);
  }

  async function handlePayNextYear(pescador_id) {
    setLoading(true);
    const guia = (
      await api.post(`/guias/paynextyear`, JSON.stringify({ pescador_id }))
    ).data;
    props.history.push(`/ver-guia/${guia.id}`);
  }

  async function handleChangeRgp(event) {
    const newRgp = event.target.value;
    setPescador(null);
    setRgp(newRgp);
    
    if (newRgp.length > 4) {
      // Primeiro tenta buscar pelo RGP
      let pescador = null;
      try {
        pescador = (await api.get(`/pescadores/rgp/${newRgp}`)).data;
      } catch (e) {
        pescador = null;
      }
      
      // Se não encontrar pelo RGP, tenta buscar pelo CPF
      if (!pescador) {
        try {
          const response = await api.get(`/pescadores?cpf=${newRgp}`);
          if (response.data && response.data.pescadores && response.data.pescadores.length > 0) {
            pescador = response.data.pescadores[0];
          }
        } catch (e) {
          pescador = null;
        }
      }

      if (pescador) {
        setPescador(pescador);
        const guias = pescador.guias;
        if (guias && guias.length > 0) {
        const ultimaGuia = guias[guias.length - 1];
        setOptionsAnos([ultimaGuia.ano, ultimaGuia.ano + 1]);
        }
      }
    }
  }

  async function handleSubmitGerarGuia(e) {
    e.preventDefault();
    if (loadingGuia) return;

    setLoadingGuia(true);

    async function gerarGuia(pescadorId) {
      try {
        const data = {
          valor,
          data_emissao: Date.now(),
          ano,
        };
        const jsonData = JSON.stringify(data);
        
        const response = await api.post(
          `/pescadores/${pescadorId}/guias`,
          jsonData
        );
        
        const { id } = response.data;
        props.history.push(`/ver-guia/${id}`);
      } catch (e) {
        if (e.response && e.response.data && e.response.data.error) {
          alert(e.response.data.error);
        } else {
          alert("Erro ao gerar guia, tente novamente!");
        }
      } finally {
        setLoadingGuia(false);
      }
    }

    if (pescador) {
      gerarGuia(pescador.id);
    } else {
      // Não tenta mais cadastrar novo pescador!
      setLoadingGuia(false);
      alert("Pescador não encontrado. Verifique os dados informados (RGP, CPF ou Nome) ou cadastre o pescador antes de gerar a guia.");
    }
  }

  useEffect(() => {
    setAno(optionsAnos[1]);
  }, [optionsAnos]);

  useEffect(() => {
    const anoAtual = new Date().getFullYear();
    let anos = [];
    let anoAux = anoAtual - 7;

    while (anoAux <= anoAtual) {
      anos.push(anoAux);
      anoAux++;
    }

    setOptionsAnos(anos);
  }, []);

  return (
    <Container className="container">
      <h1 className="title-center">{title}</h1>

      <FormSearch onSubmit={getGuiasByNome}>
        <div className="mb-4 input-group">
          <label
            className="input-group-text"
            id="basic-addon1"
            htmlFor="pesquisar_id"
          >
            <FaSearch />
          </label>
          <input
            id="pesquisar_id"
            className="form-control"
            name="pesquisar"
            value={nomePescador}
            type="search"
            autoComplete="off"
            placeholder="Procurar Pescador"
            onChange={(e) => setNomePescador(e.target.value)}
          />
        </div>
      </FormSearch>

      <div className="card animate">
        <div className="card-body">
          <form onSubmit={handleSubmitGerarGuia}>
            <div className="row">
              <div className="col-12 col-md-4 mt-3">
                <div className="input-group">
                  <label className="input-group-text" htmlFor="rgp">
                    <FaAddressCard />
                  </label>
                  <input
                    id="rgp"
                    className="form-control"
                    name="rgp"
                    type="text"
                    autoComplete="off"
                    placeholder="RGP ou CPF"
                    value={rgp}
                    onChange={handleChangeRgp}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-md-8 mt-3">
                <div className="input-group">
                  <label className="input-group-text" htmlFor="nome">
                    <FaUser />
                  </label>
                  <input
                    id="nome"
                    className="form-control"
                    name="nome"
                    type="text"
                    autoComplete="off"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    disabled={false}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-4 mt-2">
                <div className="input-group">
                  <label className="input-group-text" htmlFor="ano">
                    <FaCalendarAlt />
                  </label>
                  <select
                    onChange={(e) => setAno(e.target.value)}
                    value={ano}
                    name="ano"
                    className="form-select form-select-lg"
                  >
                    {optionsAnos.map((ano) => (
                      <option key={ano} value={ano}>
                        {ano}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-12 col-md-4 mt-2">
                <div className="input-group">
                  <label
                    className="input-group-text"
                    title="Valor da  guia"
                    htmlFor="valor_inp_id"
                  >
                    <FaFileInvoiceDollar />
                  </label>
                  <input
                    id="valor_inp_id"
                    className="form-control"
                    name="valor"
                    type="text"
                    title="Valor da  guia"
                    autoComplete="off"
                    placeholder="Valor"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-md-4 mt-2">
                <div className="input-group">
                  <label
                    className="input-group-text"
                    title="data de pagamento"
                    htmlFor="data_pagamento"
                  >
                    <FaCalendarAlt />
                  </label>
                  <InputMask
                    id="data_pagamento"
                    title="data de pagamento"
                    mask="99/99/9999"
                    className="form-control"
                    name="rgp"
                    type="text"
                    autoComplete="off"
                    placeholder="__/__/___"
                    defaultValue={new Date().toLocaleDateString()}
                    disabled={true}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-2 mt-3">
              <div className="col-12 col-md-4"></div>
              <div className="col-12 col-md-4">
                <button
                  style={{ width: "100%", fontSize: 18 }}
                  type="submit"
                  className="btn btn-primary"
                  disabled={loadingGuia}
                >
                  {!loadingGuia ? (
                    "Gerar guia de pagamento"
                  ) : (
                    <PulseLoader color="#fff" />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {guias && guias.length > 0 && (
        <>
          <div className="table-responsive mt-4">
            <table className="table">
              <thead>
                <tr>
                  <th>RGP/CPF</th>
                  <th>Nome</th>
                  <th>Data de emissão</th>
                  <th>Ano de referência</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {guias.map((guia) => (
                  <tr key={guia.id}>
                    <td>{guia.pescador.rgp}</td>
                    <td>{guia.pescador.nome}</td>
                    <td>{dateFormat(guia.data_emissao)}</td>
                    <td>{guia.ano}</td>
                    <td>{guia.valor}</td>
                    <td className="table-btn-actions" style={{ minWidth: 300 }}>
                      <Link className="btn btn-primary" to={"/ver-guia/" + guia.id}>
                        <FaEye />
                      </Link>
                      <button
                        className="btn btn-danger modal-trigger"
                        href="#modalExcluir"
                        onClick={() => {
                          setShowModalExcluir(true);
                          setIdGuia(guia.id);
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#modal-excluir-guia"
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => handlePayNextYear(guia.pescador.id)}
                        title="Gera a próxima guia de pagamento do pescador."
                      >
                        <FaMoneyBill style={{ marginRight: 5 }} /> Pagar próximo ano
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px"
            }}
          >
            <Pagination
              activePage={parseInt(pagination.currentPage)}
              pageCount={parseInt(pagination.pageCount)}
              totalItemsCount={parseInt(pagination.itemCount)}
              onChange={(page) => {
                if (search)
                  return props.history.push(
                    `/anuidade?page=${page}&search=${search}`
                  );

                props.history.push(`/anuidade?page=${page}`);
              }}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              activeClass="active"
              nextPageText={<FaAngleRight />}
              prevPageText={<FaAngleLeft />}
              lastPageText={<FaForward />}
              firstPageText={<FaBackward />}
            />
          </div>
        </>
      )}
      <Modal show={showModalExcluir} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Tem certeza que deseja excluir?</Modal.Title>
          <button
            type="button"
            class="btn-close"
            onClick={() => setShowModalExcluir(false)}
          ></button>
        </Modal.Header>
        <Modal.Body>Esta ação não pode ser desfeita.</Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowModalExcluir(false)}
          >
            Fechar
          </button>
          <button type="button" className="btn btn-danger" onClick={deleteGuia}>
            {deleting ? (
              <PulseLoader color={"#fff"} />
            ) : (
              <>
                <FaTrash style={{ marginRight: 5 }} /> Excluir
              </>
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Anuidade;
