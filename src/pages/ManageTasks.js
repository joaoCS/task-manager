import React, { useEffect, useState } from "react";
import { BiBookAdd,BiEditAlt, BiTrash } from 'react-icons/bi';

import EditTask from "./EditTask/EditTask";


export default function ManageTasks () {

    const [openEdit, setOpenEdit] = useState(false);
    const [taskToEdition, setTaskToEdition] = useState({});

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

    function openEditModal(data){
        setOpenEdit(true);
        setTaskToEdition(data);
    }

    return (
        <>
          <div className="taskManager">
                <div className="taskManagerHeader">
                    <h1>Gerenciador de tarefas</h1>
                    <button onClick={()=> openEditModal({})}>Nova tarefa &nbsp;<BiBookAdd size={20} /> </button>
                </div>
                <ul className="taskManagerBody">
                {data.map((task, idx) => {
                    return (
                        <li key={idx}>
                            <span> <strong>Título: </strong> {task.titulo}</span>
                            <span><strong>Descrição: </strong> {task.descricao}</span>
                            <span><strong>Vencimento: </strong> {task.dataVencimento}</span>
                            <button onClick={()=> openEditModal(task)}>Editar <BiEditAlt size={20}/></button>
                            <button>Remover <BiTrash size={20}/></button>
                        </li>
                    );
                })}
                </ul>
            </div>
            {openEdit && <EditTask data={taskToEdition} close={() => setOpenEdit(false)}/>}
        </>
    );
};