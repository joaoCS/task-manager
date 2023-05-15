/*

- A aplicação deve permitir ao usuário filtrar as tarefas por data de vencimento ou por status (concluída ou não concluída);
- A aplicação deve permitir ao usuário classificar as tarefas por ordem alfabética ou por ordem de vencimento;

*/


import React, { useEffect, useState } from "react";
import { BiBookAdd,BiEditAlt, BiTrash } from 'react-icons/bi';

import EditTask from "../EditTask/EditTask";
import DeleteTask from "../DeleteTask/DeleteTask";
import TaskOptions from "../../components/TaskOptions/TaskOptions";
import TaskDetails from "../TaskDetails/TaskDetails";
import api from "../../resources/api";
import moment from "moment";
import { useCookies } from "react-cookie";
import "./menuStyle.css";

export default function ManageTasks () {

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [taskToEdition, setTaskToEdition] = useState({});
    const [taskToDelete, setTaskToDelete] = useState({});
    const [openDetails, setOpenDetails] = useState(false);
    const [taskDetails, setTaskDetails] = useState({});
    const [tasks, setTasks] = useState([]);
    const [formattedTasks, setFormattedTasks] = useState([]);
    const [cookies, setCookies] = useCookies(["access_token"]);
    const [menuFiltrarVisible, setMenuFiltrarVisible] = useState(false);

    let wholeTasksList = [];

    async function fetchTasks() {
        const response = await api.get("/tasks", {
            headers: {
                authorization: cookies.access_token,
                userid: window.localStorage.getItem("userId")
            }
        });

        let ft = [];
        
        for (let index = 0; index < response.data.length; index++) {    
            
            let dataVencimentoFormatada = moment(response.data[index].dataVencimento).format("DD/MM/YYYY HH:mm:ss");
            ft.push({ 
                    ...response.data[index], 
                    dataVencimentoFormatada, 
                    // interval: setInterval(() => {
                    //         if(response.data[index].dataVencimento <= Date.now()) {
                    //             console.log("Prazo de tarefa expirado!");
                    //         }
                    // }, 1000)
            });
        }

        let timeouts = [];
        
        
        for (let index = 0; index < response.data.length; index++) {    
            let timeInterval = response.data[index].dataVencimento - Date.now();
            if(timeInterval <= 0)
                ft[index].expired = true;
            else
                timeouts.push(setTimeout(() => {
                    ft[index].expired = true;
                    
                    fetchTasks();
                }, timeInterval));
        }

        setTasks(ft);
        wholeTasksList = ft;
    }

    useEffect(()=>{
        if (cookies.access_token)
            fetchTasks();
        
    }, []);

    function openEditModal(data){
        setOpenEdit(true);
        setTaskToEdition(data);
    }

    function openDeleteModal(data) {
        setOpenDelete(true);
        setTaskToDelete(data);
    }    

    function closeEditModal() {
        setOpenEdit(false);
        fetchTasks();
    }

    function closeDeleteModal(){
        setOpenDelete(false);
        fetchTasks();
    }

    async function setTaskStatus(event, task) {
        try {
            const response = await api.post("/tasks/concluded", {
                task,
                concluded: event.target.checked,
                userId: window.localStorage.getItem("userId")
            }, 
            {
                headers: {
                    authorization: cookies.access_token
                }
            });  

            alert(response.data.message);
            fetchTasks();
        }
        catch(err) {
            alert(err.response.data.message);
        }
    }

    function seeTaskDetails(task) {
        setOpenDetails(true);
        setTaskDetails(task);
    }

    function closeDetailsModal() {
        setOpenDetails(false);
    }
    
    async function filterConcluded() {
        
        await fetchTasks();

        

        let ts = wholeTasksList.filter(task => {
            return task.concluded === true;
        });

        setTasks(ts);
    }

    async function filterNotConcluded() {
        await fetchTasks();
        
        let ts = wholeTasksList.filter(task => {
            return task.concluded === false;
        });

        setTasks(ts);
    }

    async function unFilter() {
        await fetchTasks();
    }

    return (
        <>
           {cookies.access_token &&
            <div className="taskManager">
                <div className="taskManagerHeader">
                    <div className="menuFiltrar" onClick={()=>setMenuFiltrarVisible(true)}>
                        Filtrar
                        {menuFiltrarVisible &&
                        <div onMouseLeave={()=>setMenuFiltrarVisible(false)} >
                            <span>Data</span>
                            <span onClick={filterConcluded}>
                                Concluidas
                            </span>
                            <span onClick={filterNotConcluded}>
                                Não concluidas
                            </span>
                            <span onClick={unFilter}>
                                Todas
                            </span>
                        </div>
                        }
                    </div>
                    <button onClick={()=> openEditModal({})}>Nova tarefa &nbsp;<BiBookAdd size={20} /> </button>
                </div>
                <ul className="taskManagerBody">
                {tasks.map((task, idx) => {
                    return (
                        <li key={idx} className={task.expired? "expired": task.concluded? "concluded" : ""}>
                            <span> <strong>Título: </strong> {task.titulo}</span>
                            <span><strong>Descrição: </strong> {task.descricao?.slice(0, 10) + "..."}</span>
                            <span><strong>Vencimento: </strong> {task.dataVencimentoFormatada}</span>
                            {/* <button onClick={()=> openEditModal(task)}>Editar <BiEditAlt size={20}/></button>
                            <button>Remover <BiTrash size={20}/></button> */}
                            <span><strong>Status: </strong> {task.concluded? "Concluída" : "Pendente"}</span>
                            <span>{task.expired && "Tempo expirado"}</span>
                            <span>
                                <input checked={task.concluded} type="checkbox" name="status" id="status" onChange={(event)=>setTaskStatus(event, task)}/>
                            </span>
                            <a onClick={()=>{seeTaskDetails(task)}}>Ver detalhes</a>
                            &nbsp;&nbsp;
                            <TaskOptions edit={()=>openEditModal(task)} 
                                         delete={()=>openDeleteModal(task)}
                            />
                        </li>
                    );
                })}
                </ul>
            </div>
            }
            {openEdit && <EditTask data={taskToEdition} close={closeEditModal}/>}
            {openDelete && <DeleteTask data={taskToDelete} close={closeDeleteModal}/>}
            {openDetails && <TaskDetails data={taskDetails} close={closeDetailsModal}/>}
        </>
    );
};