import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import api from "../../resources/api";
import "./editCadastro.css";

export default function EditCadastro({ close }) {

	const [userData, setUserData] = useState({});
	const [cookies, setCookies] = useCookies(["access_token"]);
	

	useEffect(()=>{

		async function fetchData() {

			try {
				const userId = window.localStorage.getItem("userId");

				const response = await api.get(`/auth/user/${userId}`, {
					headers: {
						authorization: cookies.access_token
					}
				});

				setUserData(response.data);
			}
			catch(err) {
				alert(err.response.data.message);
			}

		}

		fetchData();

	}, []);


	function handleChange(event) {

		const { name, value } = event.target;
		setUserData({ ...userData, [name]: value });
	}

	async function handleSubmit (event) {
		event.preventDefault();

		let email = userData.email;

        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        if (!emailRegex.test(email)) {
            alert("Email inválido!");
            return;
        }

        try {
            const response = await api.put('/auth/edit', userData, {
                headers: {
                    authorization: cookies.access_token
                }
            });

            alert(response.data.message);
            close();
        }
        catch (err) {
            alert("Erro ao atualizar cadastro!");
        }
	}

	return (
		<div className="editCadastro">
			<div>
				<h2>Editar Cadastro</h2>
				<form onSubmit={handleSubmit}>
					<span>
						<label htmlFor="username">Nome de usuário</label>
						<input type="text" name="username" id="username" onChange={handleChange} defaultValue={userData.username}/>
					</span>
					<span>
						<label htmlFor="email">Email</label>
						<input type="text" name="email" id="email" onChange={handleChange} defaultValue={userData.email}/>
					</span>
					<button type="submit">Editar</button>
					<button onClick={close}>Fechar</button>
				</form>
			</div>
		</div>
	);
};