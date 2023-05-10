import React from "react";
import "./deleteTask.css";
import { useCookies } from "react-cookie";
import api from "../../resources/api";

export default function DeleteTask({data, close}) {

    const [cookies, setCookies] = useCookies(["access_token"]);

    async function deleteTask() {

        const response = await api.delete("/tasks/delete", {
            headers: {
                authorization: cookies.access_token
            },
            data: {
                taskId: data._id
            }
        });


        alert(response.data.message);
        close();
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