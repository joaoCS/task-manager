import React, { useEffect, useState } from "react";

import "./login.css";

export default function Login(){

    
    function handleSubmit(event) {
        event.preventDefault();
        console.log("Estou aqui!");
    }


    return (
        <div className="login">
            <h1>Entrar</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" id="email"/><br/>
                <label htmlFor="password">Senha:</label>
                <input type="password" name="password" id="password"/>

                <button type="submit" >Entrar</button>
            </form>
        </div>
    );
};