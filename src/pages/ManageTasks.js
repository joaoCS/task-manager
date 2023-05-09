import React, { useEffect, useState } from "react";
import { BiBookAdd,BiEditAlt, BiTrash } from 'react-icons/bi';

import EditTask from "./EditTask/EditTask";
import DeleteTask from "./DeleteTask/DeleteTask";
import TaskOptions from "../components/TaskOptions/TaskOptions";
import TaskDetails from "./TaskDetails/TaskDetails";
import api from "../resources/api";
import moment from "moment";
import { useCookies } from "react-cookie";

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
            ft.push({ ...response.data[index], dataVencimentoFormatada });
        }

        setTasks(ft);
    }


    useEffect(()=>{
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
    }

    async function setTaskStatus(event, task) {

    }

    function seeTaskDetails(task) {
        setOpenDetails(true);
        setTaskDetails(task);
    }

    function closeDetailsModal() {
        setOpenDetails(false);
    }
    return (
        <>
          <div className="taskManager">
                <div className="taskManagerHeader">
                    <h1>Gerenciador de tarefas</h1>
                    <button onClick={()=> openEditModal({})}>Nova tarefa &nbsp;<BiBookAdd size={20} /> </button>
                </div>
                <ul className="taskManagerBody">
                {tasks.map((task, idx) => {
                    return (
                        <li key={idx}>
                            <span> <strong>Título: </strong> {task.titulo}</span>
                            <span><strong>Descrição: </strong> {task.descricao?.slice(0, 10) + "..."}</span>
                            <span><strong>Vencimento: </strong> {task.dataVencimentoFormatada}</span>
                            {/* <button onClick={()=> openEditModal(task)}>Editar <BiEditAlt size={20}/></button>
                            <button>Remover <BiTrash size={20}/></button> */}
                            <span><strong>Status: </strong> {task.concluded? "Concluída" : "Pendente"}</span>
                            <span>
                                <input type="checkbox" name="status" id="status" onChange={(event)=>setTaskStatus(event, task)}/>
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
            {openEdit && <EditTask data={taskToEdition} close={closeEditModal}/>}
            {openDelete && <DeleteTask data={taskToDelete} close={closeDeleteModal}/>}
            {openDetails && <TaskDetails data={taskDetails} close={closeDetailsModal}/>}
        </>
    );
};