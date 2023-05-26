import React from "react";
import { BiBookAdd } from "react-icons/bi";
import "./emptyTasksList.css";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export default function EmptyTasksList({ openEdit }){

  const [cookies, setCookies] = useCookies(["access_token"]);

  return (
    cookies.access_token?
    <div className="tasksList">
      <h1>Você ainda não tem nenhuma tarefa.</h1>
      <h1>Crie uma agora mesmo!</h1>
      <button onClick={openEdit}>Nova tarefa &nbsp;<BiBookAdd size={20} /> </button>
    </div>
    :
    <div className="tasksList">
      <h1>Cadastre-se para criar tarefas!</h1>
      <Link to="cadastro">Cadastrar-se</Link>
    </div>
  );
}