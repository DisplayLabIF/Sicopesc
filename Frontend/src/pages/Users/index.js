import React, { useEffect, useState } from "react";

import { Container } from "./styles";

import { Modal } from "react-bootstrap";
import { HashLoader, PulseLoader } from "react-spinners";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";

function Users(props) {
  const { title = "" } = props;
  const [users, setUsers] = useState([]);
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function deletePescador(e) {
    e.preventDefault();
    setDeleting(true);
    try {
      await api.delete(`/user/${userId}`);
      //props.history.push(`/pescador`);
      window.location.reload();
    } catch (e) {
      //setToLogin(true);
    }
    setDeleting(false);
  }

  useEffect(() => {
    function getUsers() {
      setLoading(true);
      api
        .get("/users")
        .then((response) => {
          const users = response.data;
          setUsers(users);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    getUsers();
  }, []);

  return (
    <Container className="container">
      <h1 className="title-center">{title}</h1>
      <Link
        className="btn btn-primary mb-2"
        style={{ width: 176 }}
        to="/novo-usuario"
      >
        <FaUserPlus style={{ marginRight: 5 }} /> Novo usuário
      </Link>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <HashLoader size={30} color="#007bff" />
        </div>
      ) : (
        <div className="table-responsive mt-4">
          <table className="table">
            <thead>
              <tr>
                <th className="col-nome">Nome</th>
                <th className="col-email">E-mail</th>
                <th className="col-tipo">Tipo</th>
                <th className="col-acoes">Ações</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  {/* Nome */}
                  <td className="col-nome">
                    <span className="first-name">
                      {user.nome?.split(" ")[0]}
                    </span>
                    <span className="rest-name">
                      {" " + user.nome?.split(" ").slice(1).join(" ")}
                    </span>
                  </td>

                  {/* Email */}
                  <td className="col-email">
                    {user.email}
                  </td>

                  {/* Tipo */}
                  <td className="col-tipo">
                    {user.role}
                  </td>

                  {/* Ações */}
                  <td className="col-acoes" style={{ display: "flex" }}>
                    <Link
                      className="btn btn-warning btn-action"
                      to={`/editar-usuario/${user.id}`}
                      style={{ width: 40, height: 30, marginLeft: 10 }}
                    >
                      <FaEdit />
                    </Link>

                    {user.role !== "ADMIN" && (
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setUserId(user.id);
                          setShowModalExcluir(true);
                        }}
                        style={{ width: 40, height: 30, marginLeft: 10 }}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default Users;
