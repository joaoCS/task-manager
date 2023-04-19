import React, { useState, useEffect } from "react";
import moment from "moment";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { type } from "@testing-library/user-event/dist/type";
import "react-datepicker/dist/react-datepicker.css";

import "./editTask.css";

 /*
    Para guardar a data no BD, faz o parsing da data: Date.parse(data), que fica como número.
    
    Para ler do BD, transforma o registro em formato Number para Date: dataDoBD = new Date(dataNumber) e seta no campo.

    Para mostrar para o usuário, usa-se as funções: moment(dataNumber).format("DD/MM/YYYY hh:mm:ss")

*/


export default function EditTask({ close, data }) {

    const [startDate, setStartDate] = useState(new Date());


    function whichTitle(){
        return (
            data.titulo? "Editar tarefa" : "Nova tarefa"
        );
    }

    useEffect(()=> {
        registerLocale('pt-BR', ptBR);
        if(data.titulo !== undefined ) {

            setStartDate(new Date(data.dataVencimento));
            console.log(startDate);
            console.log(typeof(startDate));
        }
    }, []);


    function handleDate(date) {
        console.log(typeof(date));

        let d = Date.parse(date);
        console.log(d);
        console.log(moment(d).format("DD/MM/YYYY hh:mm:ss"));

        setStartDate(date);

        let novaData = Date(d);
        console.log(novaData);
    }

    function handleChange(event) {

    }
    async function save() {

    }

    return (
        <div className="editar">
            <form>
                <h1>{whichTitle()}</h1>
                <span>
                    <label htmlFor="titulo">Título</label>
                    <input value={data.titulo} id="titulo" name="titulo" type="text" onChange={handleChange}/>
                </span>
                <span>
                    <label htmlFor="descricao">Descrição</label>
                    <textarea value={data.descricao} id="descricao" name="descricao" onChange={handleChange}></textarea>

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