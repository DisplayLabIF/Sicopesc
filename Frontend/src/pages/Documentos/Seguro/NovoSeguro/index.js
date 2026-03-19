import React, { useCallback, useEffect, useState } from "react";
import {
  FaSearch,
  FaAngleRight,
  FaAngleLeft,
  FaForward,
  FaBackward,
  FaFileContract,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import Pagination from "react-js-pagination";
import queryString from "query-string";

import api from "../../../../services/api";
import { dateFormat } from "../../../../Utils";

import { Container } from "./styles";

export default function Pescador(props) {
  const { title = ""} = props;
  console.log(title);
  const [page, setPage] = useState(1);
  const [pescadores, setPescadores] = useState([]);
  const [pagination, setPagination] = useState({
    itemCount: 0,
    pageCount: 0,
    pages: 0,
    currentPage: 1,
  });
  const [search, setSearch] = useState(false);

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

  const [nomePescador, setNomePescador] = useState("");
  const [loading, setLoading] = useState(false);

  async function getPescadoresByNome(e) {
    e.preventDefault();
    setPage(1);
    if (nomePescador === "") return props.history.push(`/documentos/seguro/gerar-seguro`);
    return props.history.push(`/documentos/seguro/gerar-seguro?search=${nomePescador}`);
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
                <td className="col-nome">
                  <span className="first-name">
                    {pescador.nome?.split(" ")[0]}
                  </span>
                  <span className="rest-name">
                    {" " + pescador.nome?.split(" ").slice(1).join(" ")}
                  </span>
                </td>
                <td>{dateFormat(pescador.nascimento)}</td>
                <td style={{ display: "flex" }}>
                    <Link
                        className="btn btn-warning btn-action"
                        title="Gerar Seguro"
                        to={`/documentos/seguro/gerar-seguro/${pescador.id}`}
                        >
                        <FaFileContract /> {/* Ícone de documento/contrato para o seguro */}
                    </Link>
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
    </Container>
  );
}
