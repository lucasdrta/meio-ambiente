import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useForm } from 'react-hook-form'

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState([]);
  const [password, setPassword] = useState("");

  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = async (props) => {
    try {
      const data = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      console.log(props.image[0])

      data.append("name", name);
      data.append("email", email);
      data.append("position", position);
      data.append("password", password);
      data.append("file", props.image[0]);

      const resposne = await api.post("/users", data, config);

      if(resposne.status === 200) {history.push('/login')}
      

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="container">
        <section>
          <img src={logoImg} height="64" alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e visualize informações sobre
            as fazendas
          </p>

          <Link className="back-link" to="/login">
            <FiArrowLeft size={16} color="#036424" />
            Voltar para o login
          </Link>
        </section>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select className="select-css" onChange={e => setPosition(e.target.value)}>
            <option selected disabled>Selecione o seu cargo</option>
            <option value="public">pessoa publica</option>
            <option value="director">Diretor do meio ambiente</option>
            <option value="minister">Minitro do meio ambiente</option>
          </select>

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input 
            className="input-file" 
            ref={register} 
            id="file" 
            name="image"
            type="file" 
          />
          <label htmlFor="file" className="input-file-trigger">
            Foto de sua biometria...
          </label>

          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
