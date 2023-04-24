import React, { useState, useEffect } from "react";
import moment from "moment";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { type } from "@testing-library/user-event/dist/type";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../resouces/api";

import "./editTask.css";

 /*
    Para guardar a data no BD, faz o parsing da data: Date.parse(data), que fica como número.
    
    Para ler do BD, transforma o registro em formato Number para Date: dataDoBD = new Date(dataNumber) e seta no campo.

    Para mostrar para o usuário, usa-se as funções: moment(dataNumber).format("DD/MM/YYYY hh:mm:ss")

*/


export default function EditTask({ close, data }) {

    const [startDate, setStartDate] = useState(new Date());
    const [taskData, setTaskData] = useState({});
    const [titulo, setTitulo] = useState("");


    useEffect(()=> {
        registerLocale('pt-BR', ptBR);
        if(data.titulo !== undefined ) {// editar
            setTitulo("Editar Tarefa");
            setStartDate(new Date(data.dataVencimento));
            setTaskData({ 
                titulo: data.titulo,
                descricao: data.descricao, 
                dataVencimento: startDate.getTime(), 
                concluded: data.concluded
            });
        }
        else
            setTitulo("Nova Tarefa");
    }, []);


    function handleDate(date) {

        setStartDate(date);

    }

    function handleChange(event) {
        const { name, value } = event.target;

        setTaskData({...taskData, [name]: value, dataVencimento: startDate.getTime(), status: false});
    }

    async function save(event) {
        event.preventDefault();
        if(taskData.titulo === "" || taskData.titulo === undefined) {
            alert("Insira um título!");
            return;
        }
        if (titulo === "Nova Tarefa") {
            try {
                const response = await api.post("/tasks/create", taskData);

                alert(response.data.message);
            } 
            catch (err) {
                alert(err.response.data.message);
            }
        }
        else {
            
        }
    }

    return (
        <div className="editar">
            <form>
                <h1>{titulo}</h1>
                <span>
                    <label htmlFor="titulo">Título</label>
                    <input defaultValue={data.titulo} id="titulo" name="titulo" type="text" onChange={handleChange}/>
                </span>
                <span>
                    <label htmlFor="descricao">Descrição</label>
                    <textarea defaultValue={data.descricao} id="descricao" name="descricao" onChange={handleChange}></textarea>

                </span>
                <span>
                    <label htmlFor="dataVencimento">Data de vencimento</label>
                    <DatePicker name="dataVencimento" id="dataVencimento" selected={startDate} onChange={handleDate} showTimeSelect dateFormat="Pp" locale={ptBR}/>
                </span>
                <span className="closesave">
                    <button onClick={save}>Salvar</button>
                    <button onClick={close}>Fechar</button>
                </span>
            </form>
        </div>
    );
};