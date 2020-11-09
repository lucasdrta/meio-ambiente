import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.png";

function Login() {
  return (
    <Link to="/login" className="button">
      Faça seu Login
    </Link>
  );
}

export default function Feed() {
  const [farms, setFarms] = useState([]);

  const username = localStorage.getItem("name");

  const history = useHistory();

  useEffect(() => {
    api.get("farms").then((response) => {
      setFarms(response.data);
    });
  }, []);

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="feed-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem vindo {username}</span>

        {(localStorage.getItem('name')) ? (
          <>
          <Link to="/farm/new" className="button">
            Cadastrar novas fazendas
          </Link>

          <button onClick={handleLogout}> 
            <FiPower size={18} color="#036424" />
          </button>
        </>
          
        
        ) : (
          <Login />
        )}
      </header>

      <h1>Dados sobre as fazendas:</h1>

      <ul>
        {farms.map((farm) => (
          <li key={farm.id}>
            <strong>Proprietário da fazenda:</strong>
            <p>{farm.owner}</p>
            <strong>Localização:</strong>
            <p>{farm.location}</p>
            <Link
              className="button-2"
              to={{ pathname: "/farm/detail", state: farm }}
            >
              <p>Ver detalhes</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
