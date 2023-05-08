import React, { useEffect, useState } from "react";
import "./login.css";

import api from "../../resources/api.js";

import { addUser } from "../../components/navbar/userSlice";
import { useDispatch } from "react-redux";

import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Login(){

    const [loginData, setLoginData] = useState({});
    const [cookies, setCookies] = useCookies(["access_token"]);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    async function handleSubmit(event) {
        event.preventDefault();

        try{
            const response = await api.post("/auth/login", loginData);

            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userId", response.data.userId);


            dispatch(addUser(response.data.username));
            navigate("/");
        }
        catch(err) {
            alert(err.response.data.message);
        }        
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setLoginData({ ...loginData, [name]: value });
    }

    return (
        <div className="login">
            <h1>Entrar</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" id="email" onChange={handleChange}/><br/>
                <label htmlFor="password">Senha:</label>
                <input type="password" name="password" id="password" onChange={handleChange}/>

                <button type="submit" >Entrar</button>
                <Link to="/forgot-password">Esqueci a senha</Link>
            </form>
        </div>
    );
};