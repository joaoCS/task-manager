import React, { useState, useEffect } from "react";
import moment from "moment";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { type } from "@testing-library/user-event/dist/type";
import "react-datepicker/dist/react-datepicker.css";

import "./editTask.css";

 /*
    Para guardar a data no BD, faz o parsing da data: Date.parse(data), que fica como número.
    
    Para ler do BD, transforma o registro em formato Number para Date: dataDoBD = Date(dataNumber) e seta no campo.

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



    return (
        <div className="editar">
            <form>
                <h1>{whichTitle()}</h1>
                <DatePicker selected={startDate} onChange={handleDate} showTimeSelect dateFormat="Pp" locale={ptBR}/>
                <button onClick={close}>Fechar</button>
            </form>
        </div>
    );
};