import React from "react";
import "./deleteTask.css";

export default function DeleteTask({data, close}) {

    async function deleteTask() {

    }

    return (
        <div className="deleteTask">
            <div>
                <h1>Deletar Tarefa '{data.titulo}'?</h1>
                <span>
                    <button onClick={deleteTask}>Sim</button>
                    <button onClick={close}>Não</button>
                </span>
            </div>
        </div>
    );
};