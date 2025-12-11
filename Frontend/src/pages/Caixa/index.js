import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  FaAngleLeft,
  FaAngleRight,
  FaBackward,
  FaDollarSign,
  FaEye,
  FaForward,
  FaShoppingCart,
  FaTrash,
} from "react-icons/fa";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import { HashLoader, PulseLoader } from "react-spinners";
import api from "../../services/api";

import { ButtonHeader, Container, Header } from "./styles";

function Caixa(props) {
  const [recibos, setRecibos] = useState([]);
  const [reciboId, setReciboId] = useState(null);
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [pagination, setPagination] = useState({
    itemCount: 0,
    pageCount: 0,
    pages: 0,
    currentPage: 1,
  });

  useEffect(() => {
    async function getRecibos() {
      setLoading(true);
      try {
        const result = (await api.get("/recibo")).data;
        setRecibos(result.recibos);
        setPagination({
          itemCount: result.itemCount,
          pageCount: result.pageCount,
          pages: result.pages,
          currentPage: result.currentPage,
        });
      } catch (e) {
        console.log("erro ao tentar recuperar recibos");
      }
      setLoading(false);
    }
    getRecibos();
  }, []);

  async function deletePescador(e) {
    e.preventDefault();
    setDeleting(true);
    try {
      await api.delete(`/recibo/${reciboId}`);
      //props.history.push(`/pescador`);
      window.location.reload();
    } catch (e) {
      //setToLogin(true);
    }
    setDeleting(false);
  }

  return (
    <Container className="container">
      <Header>
        <ButtonHeader
          className="btn btn-primary"
          onClick={() => props.history.push("/venda")}
        >
          <FaDollarSign style={{ marginRight: 8 }} /> NOVA VENDA
        </ButtonHeader>

        <ButtonHeader
          className="btn btn-primary"
          onClick={() => props.history.push("/compra")}
        >
          <FaShoppingCart style={{ marginRight: 8 }} /> NOVA COMPRA
        </ButtonHeader>
      </Header>

      {recibos && recibos.length > 0 && (
        <>
        <div className="table-responsive mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {recibos.map((recibo) => (
                <tr key={recibo.id}>
                  <td
                    style={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    <span
                      className={
                        "tipo-fluxo border-radius " +
                        (recibo.tipo.toUpperCase() === "VENDA"
                          ? "bg-success"
                          : "bg-warning")
                      }
                    >
                      {recibo.tipo}
                    </span>
                  </td>
                  <td>{recibo.nome}</td>
                  <td>{recibo.descricao}</td>
                  <td>
                    {(recibo.tipo.toUpperCase() === "COMPRA" ? "-" : "") +
                      recibo.valor}
                  </td>
                  <td style={{ display: "flex" }}>
                    <Link
                      className="btn btn-primary"
                      to={"/recibo/" + recibo.id}
                      style={{ width: 60, height: 50, marginLeft: 10 }}
                    >
                      <FaEye />
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setReciboId(recibo.id);
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
                  `/caixa?page=${page}&search=${search}`
                );

              props.history.push(`/caixa?page=${page}`);
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

export default Caixa;
