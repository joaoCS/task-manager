import React from "react";

import "./cadastro.css";

export default function Cadastro() {

    function handleChange() {

    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="cadastro">
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit}>
                <span>
                    <label htmlFor="username">Nome: </label>
                    <input type="text"  name="username" id="username" onChange={handleChange}/>
                </span>
                <span>
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" id="email" onChange={handleChange}/>
                </span>

                <span>
                    <label htmlFor="password">Senha: </label>
                    <input type="password" name="password" id="password" onChange={handleChange}/>
                </span>
                <button type="submit">Cadastrar</button>

            </form>
        </div>
    );
};