import React from "react";
import { BiBookAdd } from "react-icons/bi";
import "./emptyTasksList.css";

export default function EmptyTasksList({ openEdit }){
  return (
    <div className="tasksList">
      <h1>Você ainda não tem nenhuma tarefa.</h1>
      <h1>Crie uma agora mesmo!</h1>
      <button onClick={openEdit}>Nova tarefa &nbsp;<BiBookAdd size={20} /> </button>
    </div>
  );
}