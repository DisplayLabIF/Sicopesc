import React, { useCallback, useEffect, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaTrash,
  FaPlusSquare,
  FaSearch,
  FaAngleRight,
  FaAngleLeft,
  FaForward,
  FaBackward,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import Pagination from "react-js-pagination";
import queryString from "query-string";

import api from "../../services/api";
import { dateFormat } from "../../Utils";

import { Container } from "./styles";
import { Modal } from "react-bootstrap";
import { PulseLoader } from "react-spinners";

export default function Pescador(props) {
  const { title = ""} = props;
  console.log(title);
  const [page, setPage] = useState(1);
  const [pescadores, setPescadores] = useState([]);
  const [idPescador, setIdPescador] = useState(0);
  const [pagination, setPagination] = useState({
    itemCount: 0,
    pageCount: 0,
    pages: 0,
    currentPage: 1,
  });
  const [search, setSearch] = useState(false);
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const getPescadores = useCallback(async (page) => {
    try {
      setLoading(true);
      const response = await api.get(`/pescadores?page=${page}`);
      setPescadores(response.data.pescadores);
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
  }, []);

  useEffect(() => {
    const values = queryString.parse(props.location.search);
    let p = values.page;
    const search = values.search;
    if (p) {
      setPage(parseInt(p));
    }
    setSearch(search);
  }, [props.location.search]);

  useEffect(() => {
    if (!search) getPescadores(page);
  }, [page, getPescadores, search]);

  useEffect(() => {
    async function getPescadorByName() {
      setLoading(true);

      const data = (await api.get(`/pescadores/nome/${search}?page=${page}`)).data;
      
      setPescadores(data.pescadores);
      setPagination({
        itemCount: data.itemCount,
        pageCount: data.pageCount,
        pages: data.pages,
        currentPage: data.currentPage,
      });
      setLoading(false);
    }
    if (search) {
      getPescadorByName();
    }
  }, [search, page]);

  async function deletePescador(e) {
    e.preventDefault();
    setDeleting(true);
    try {
      await api.delete(`/pescadores/${idPescador}`);
      //props.history.push(`/pescador`);
      window.location.reload();
    } catch (e) {
      //setToLogin(true);
    }
    setDeleting(false);
  }
  const [nomePescador, setNomePescador] = useState("");
  const [loading, setLoading] = useState(false);

  async function getPescadoresByNome(e) {
    e.preventDefault();
    setPage(1);
    if (nomePescador === "") return props.history.push(`/pescador`);
    return props.history.push(`/pescador?search=${nomePescador}`);
  }

  return (
    <Container className="container">
      <h1 className="title-center">{title}</h1>
      <form onSubmit={getPescadoresByNome}>
        <div className="mb-4 input-group">
          <label className="input-group-text" id="basic-addon1">
            <FaSearch />
          </label>
          <input
            type="text"
            id="pesquisar_id"
            placeholder="Procurar pescador"
            className="form-control"
            style={{ marginRight: 5 }}
            onChange={(e) => setNomePescador(e.target.value)}
          />
        </div>
      </form>

      <Link
        className="btn btn-primary mb-2"
        style={{ width: 176 }}
        to="/novo-pescador"
      >
        <FaPlusSquare /> Novo pescador
      </Link>

      {/*<div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="card-head secondary table-rounded"
        >
          <PaginationInfo>
            <span style={{ marginRight: 20 }}>
              Página: {pagination.currentPage}/{pagination.pageCount}
            </span>
            <span>{pagination.itemCount} Resultados</span>
          </PaginationInfo>
        </div>*/}
      <div className="table-responsive mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>RGP</th>
              <th>Nome</th>
              <th>Nascimento</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {pescadores.map((pescador) => (
              <tr key={pescador.id}>
                <td>{pescador.rgp}</td>
                <td>{pescador.nome}</td>
                <td>{dateFormat(pescador.nascimento)}</td>
                <td style={{ display: "flex" }}>
                  <Link
                    className="btn btn-primary"
                    to={"/ver-pescador/" + pescador.id}
                    style={{ width: 60, height: 50, marginLeft: 10 }}
                  >
                    <FaEye />
                  </Link>
                  <Link
                    className="btn btn-warning"
                    to={`/editar-pescador/${pescador.id}`}
                    style={{ width: 60, height: 50, marginLeft: 10 }}
                  >
                    <FaEdit />
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setIdPescador(pescador.id);
                      setShowModalExcluir(true);
                    }}
                    style={{ width: 60, height: 50, marginLeft: 10 }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
        {loading ? <HashLoader size={30} /> : ""}
      
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
                `/pescador?page=${page}&search=${search}`
              );

            props.history.push(`/pescador?page=${page}`);
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
          <button
            type="button"
            className="btn btn-danger"
            onClick={deletePescador}
          >
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
