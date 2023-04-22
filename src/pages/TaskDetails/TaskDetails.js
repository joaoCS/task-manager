import React, { useEffect, useState } from "react";
import TaskOptions from "../../components/TaskOptions/TaskOptions";
import moment from "moment";
import "./taskDetails.css";

export default function TaskDetails({data, close}){

    const [dataVencimento, setDataVencimento] = useState("");

    useEffect(()=> {
        setDataVencimento(moment(data.dataVencimento).format("DD/MM/YYYY hh:mm:ss"));
        
    }, []);

    return (
        <div className="details">
            <div>
                <h1>Detalhes</h1>
                <span>
                    <h3>Titulo:</h3>
                    <span>{data.titulo}</span>
                </span>

                <span>
                    <h3>Descrição:</h3>
                    <span>{data.descricao}</span>
                </span>
                <span>
                    <h3>Vencimento:</h3>
                    <span>{dataVencimento}</span>
                </span>
                <span>
                    <h3>Status:</h3>
                    <span>{data.concluded? "Concluída" : "Pedente"}</span>
                </span>
                <button onClick={close}>Fechar</button>
            </div>
        </div>
    );
}