import React, { useState } from "react";

import "./cadastro.css";

import api from "../../resources/api.js";

import { useNavigate } from "react-router-dom";

export default function Cadastro() {

    const [userData, setUserData] = useState({});

    const navigate = useNavigate();
    function handleChange(event) {
        const { name, value } = event.target;


        setUserData({...userData, [name]: value});
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post("/auth/createAdmin", userData);
        
        alert(response.data.message);

        navigate("/login");
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