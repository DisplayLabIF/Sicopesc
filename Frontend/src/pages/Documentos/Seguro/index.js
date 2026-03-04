import React, { useCallback, useEffect, useState } from "react";
import { 
    Container,
    DocButton,
} from "./styles";
import { FaSearch, FaAngleRight, FaAngleLeft, FaForward, FaBackward } from "react-icons/fa";
import Pagination from "react-js-pagination";
import queryString from "query-string";
import { IoDocumentText } from "react-icons/io5";
import { dateFormat } from "../../../Utils";
import api from "../../../services/api";


function Seguro(props) {
  const [page, setPage] = useState(1);
  const [pescadores, setPescadores] = useState([]);
  const [pagination, setPagination] = useState({
    itemCount: 0,
    pageCount: 0,
    pages: 0,
    currentPage: 1,
  });
  const [search, setSearch] = useState(false);
  const [nomePescador, setNomePescador] = useState("");
  const [loading, setLoading] = useState(false);

  const getPescadores = useCallback(async (pageNumber) => {
    try {
      setLoading(true);
      const response = await api.get(`/pescadores?page=${pageNumber}`);
      setPescadores(response.data.pescadores);
      setPagination({
        itemCount: response.data.itemCount,
        pageCount: response.data.pageCount,
        pages: response.data.pages,
        currentPage: response.data.currentPage,
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const values = queryString.parse(props.location.search);
    let p = values.page;
    const s = values.search;
    if (p) {
      setPage(parseInt(p));
    }
    setSearch(s);
  }, [props.location.search]);

  useEffect(() => {
    if (!search) getPescadores(page);
  }, [page, getPescadores, search]);

  useEffect(() => {
    async function getPescadorByName() {
      setLoading(true);
      const encoded = encodeURIComponent(search);
      const data = (await api.get(`/pescadores/nome/${encoded}?page=${page}`)).data;
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

  async function onSubmitBuscar(e) {
    e.preventDefault();
    setPage(1);
    if (nomePescador === "") return props.history.push(`/seguro`);
    return props.history.push(`/seguro?search=${encodeURIComponent(nomePescador)}`);
  }
  

  return (
    <Container>
      <div className="container" style={{ width: "100%" }}>
        <form onSubmit={onSubmitBuscar}>
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

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>RGP</th>
                <th>Nome</th>
                <th>Nascimento</th>
                <th>Seguro</th>
              </tr>
            </thead>
            <tbody>
              {pescadores.map((pescador) => (
                <tr key={pescador.id}>
                  <td>{pescador.rgp}</td>
                  <td>
                    <span className="first-name">{pescador.nome.split(" ")[0]}</span>
                    <span className="last-name">{pescador.nome.split(" ")[1]}</span>
                  </td>
                  <td>{dateFormat(pescador.nascimento)}</td>
                  <td>
                    <DocButton
                      className="btn btn-warning btn-action"
                      type="button"
                      title="Documento do Seguro"
                      onClick={() => props.history.push(`/documentos/seguro/exibir-seguro/${pescador.id}`)}
                    >
                      <IoDocumentText />
                    </DocButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Pagination
            activePage={parseInt(pagination.currentPage)}
            pageCount={parseInt(pagination.pageCount)}
            totalItemsCount={parseInt(pagination.itemCount)}
            onChange={(p) => {
              if (search)
                return props.history.push(
                  `/seguro?page=${p}&search=${encodeURIComponent(search)}`
                );
              props.history.push(`/seguro?page=${p}`);
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
      </div>
    </Container>
  );
}

export default Seguro;