import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, addUser } from "./userSlice";
import api from "../../resources/api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import EditCadastro from "../../pages/EditCadastro/EditCadastro.js";

export default function Navbar() {


    const [cookies, setCookies] = useCookies(["access_token"]);
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showEditCadastro, setShowEditCadastro] = useState(false);
    const navigate = useNavigate();

    let user = useSelector(selectUser);

    user = {...user};

    useEffect(()=>{

        async function fetchData() {
            try{
                const response = await api.get("/auth/username", {
                    headers: {
                        authorization: cookies.access_token,
                        userid: window.localStorage.getItem("userId")
                    }
                });

                dispatch(addUser(response.data.username));
                setUserName(user.username);
            }
            catch(err) {
                console.log(err);
            }
        }

        fetchData();

    }, [user]);

    function logout() {
        setCookies("access_token", "");
        window.localStorage.removeItem("userId");
        dispatch(addUser(""));
        navigate("/login");

    }


    return (
        <>
        { showEditCadastro && 
            <EditCadastro 
                close={()=>setShowEditCadastro(false)}
            >
            </EditCadastro>
        }
        <div className="navbar">
            <span><Link to="/">Gerenciador de Tarefas</Link></span>
            
            { !cookies.access_token &&
             <div>
                <Link to="/cadastro">Cadastrar-se</Link>
                <Link to="/login">Entrar</Link>

            </div>
            }
            {cookies.access_token && 
                <div>
                    <a onMouseOver={()=> setShowAccountMenu(true)}>
                        {userName}
                        {showAccountMenu && 
                            <div onMouseLeave={() => setShowAccountMenu(false)}>
                                <a onClick={() => setShowEditCadastro(true)}>Editar conta</a>
                            </div>
                        }
                    </a>
                    <a onClick={logout}>Sair</a>
                </div>
            }


        </div>
        
        </>
    );
};