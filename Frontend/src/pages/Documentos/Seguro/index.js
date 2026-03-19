import React, { useCallback, useEffect, useState } from "react";
import { Container, DocButton } from "./styles";
import { 
    FaSearch, FaAngleRight, FaAngleLeft, 
    FaForward, FaBackward, FaTrash, FaEye, 
    FaPlusSquare
} from "react-icons/fa";
import Pagination from "react-js-pagination";
import queryString from "query-string";
import { dateFormat } from "../../../Utils";
import api from "../../../services/api";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Seguro(props) {
  const {title  = ""} = props;
  const [page, setPage] = useState(1);
  const [seguros, setSeguros] = useState([]);
  const [pagination, setPagination] = useState({
    itemCount: 0,
    pageCount: 0,
    pages: 0,
    currentPage: 1,
  });
  const [search, setSearch] = useState(false);
  const [nomePescador, setNomePescador] = useState("");
  const [loading, setLoading] = useState(false);

  // Busca a lista de seguros (aceita filtro de busca por nome do pescador no seguro)
  const getSeguros = useCallback(async (page) => {
    try {
      setLoading(true);
      const response = await api.get(`/seguros?page=${page}`);
      setSeguros(response.data.seguros);
      setPagination({
        itemCount: response.data.itemCount,
        pageCount: response.data.pageCount,
        pages: response.data.pages,
        currentPage: response.data.currentPage
      })
      setLoading(false)
    } catch (e) {
      console.error("Erro ao carregar seguros:", e);
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
    if (!search) getSeguros(page);
  }, [page, getSeguros, search]);

  useEffect(() => {
    async function getSeguroByName() {
      setLoading(true);

      const data = (await api.get(`/seguros/nome/${search}?page=${page}`)).data;
      
      setSeguros(data.seguros);
      setPagination({
        itemCount: data.itemCount,
        pageCount: data.pageCount,
        pages: data.pages,
        currentPage: data.currentPage,
      });
      setLoading(false);
    }
    if (search) {
      getSeguroByName();
    }
  }, [search, page]);

  async function getSegurosByNome(e) {
    e.preventDefault();
    setPage(1);
    if (nomePescador === "") return props.history.push(`/documentos/seguro/`);
    return props.history.push(`/documentos/seguro?search=${nomePescador}`);
  }

  async function handleDeleteSeguro(id) {
    if (window.confirm("Deseja realmente excluir este registro de seguro?")) {
      try {
        await api.delete(`/seguros/${id}`);
        alert("Seguro excluído com sucesso!");
        getSeguros(page, search);
      } catch (e) {
        alert("Erro ao excluir seguro.");
      }
    }
  }

  return (
    <Container>
      <div className="container" style={{ width: "100%" }}>
        {/* BUSCA NOS SEGUROS JÁ EMITIDOS */}
        <h1 className="title-center">{title}</h1>
        <form onSubmit={getSegurosByNome}>
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
          to="/documentos/seguro/gerar-seguro"
        >
          <FaPlusSquare /> Novo Seguro
        </Link>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
                <tr className="table-light">
                  <th>Data Emissão</th>
                  <th>Pescador</th>
                  <th>CPF</th>
                  <th className="text-center">Ações</th>
                </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center">Carregando...</td></tr>
              ) : seguros.length > 0 ? (
                seguros.map((s) => (
                    <tr key={s.id}>
                      <td>{dateFormat(s.data_declaracao)}</td>
                      <td>
                        <span className="first-name">
                          {s.pescador.nome?.split(" ") [0]}
                        </span>
                        <span className="rest-name">
                          {" " + s.pescador.nome?.split(" ").slice(1).join(" ")}
                        </span>
                      </td>
                      <td>{s.pescador?.cpf}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center align-items-center">
                          <DocButton
                            className="btn btn-primary btn-action"
                            title="Visualizar/Imprimir"
                            onClick={() => props.history.push(`/documentos/seguro/exibir-seguro/${s.id}`)}
                          >
                            <FaEye />
                          </DocButton>
  
                          <button
                            className="btn btn-danger btn-action"
                            title="Excluir Registro"
                            onClick={() => handleDeleteSeguro(s.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr><td colSpan="4" className="text-center">Nenhum seguro localizado.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINAÇÃO */}
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            activePage={page}
            itemsCountPerPage={20}
            totalItemsCount={parseInt(pagination.itemCount)}
            pageRangeDisplayed={5}
            onChange={(p) => {
              const url = search 
                ? `/seguro?page=${p}&search=${encodeURIComponent(search)}`
                : `/seguro?page=${p}`;
              props.history.push(url);
            }}
            itemClass="page-item"
            linkClass="page-link"
            nextPageText={<FaAngleRight />}
            prevPageText={<FaAngleLeft />}
            firstPageText={<FaBackward />}
            lastPageText={<FaForward />}
          />
        </div>
      </div>
    </Container>
  );
}

export default Seguro;