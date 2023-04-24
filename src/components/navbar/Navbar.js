import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="navbar">
            <span><Link to="/">Gerenciador de Tarefas</Link></span>
            
            <div>
                <Link to="/cadastro">Cadastrar-se</Link>
                <Link to="/login">Entrar</Link>

            </div>
        </div>
    );
};