import React from "react";





export default function ManageTask () {

    let data = [
        {
            titulo: "Tomar remedio",
            descricao: "O remédio está no armário.",
            dataVencimento: new Date().getTime()
        },

        {
            titulo: "Ler livro",
            descricao: "Estou no capítulo 5",
            dataVencimento: new Date().getTime()
        },


        {
            titulo: "Fazer caminhada",
            descricao: "Caminhar 40 minutos",
            dataVencimento: new Date().getTime()
        }

    ];


    return (
        <div className="taskManager">
            <div className="taskManagerHeader">
                <h1>Gerenciador de tarefas</h1>
                <button>Nova tarefa</button>
            </div>
            <ul className="taskManagerBody">
            {data.map((task, idx) => {
                return (
                    <li key={idx}>
                        <span> <strong>Título: </strong> {task.titulo}</span>
                        <span><strong>Descrição: </strong> {task.descricao}</span>
                        <span><strong>Vencimento: </strong> {task.dataVencimento}</span>
                    </li>
                );
            })}
            </ul>
        </div>
    );
};