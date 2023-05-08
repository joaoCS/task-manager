import React, { useState } from "react";
import "./forgotPassword.css";
import api from "../../resources/api";


export default function ForgotPassword(){

    const [email, setEmail] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        try {
           const response = await api.post("/auth/forgot-password/", { email });

           console.log(response.data);
           alert("Confira seu email!");

         }
         catch(err) {
            alert(err.response.data.message);
         }
    }


    return (
        <div className="forgotPassword">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Insira seu email cadastrado:</label>
                <input id="email" name="email" type="text" onChange={(event) => setEmail(event.target.value)}/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}