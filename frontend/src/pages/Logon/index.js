import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useForm } from "react-hook-form";
import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.png";

export default function Logon() {
  const [email, setEmail] = useState("");
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

      data.append("email", email);
      data.append("password", password);
      data.append("file", props.image);

      const resposne = await api.post("/users/authenticate", data, config);

      const token = resposne.data.token;
      const user = await api.get("/users/me", {
        headers: {
          "x-access-token": token,
        },
      });

      localStorage.setItem("name", user.data.user.name);
      localStorage.setItem("email", user.data.user.email);
      localStorage.setItem("position", user.data.user.position);

      history.push("/");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} width="100" alt="Logo" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Faça seu login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="input-file"
            ref={register}
            id="my-file"
            name="image"
            type="file"
          />

          <label tabIndex="0" htmlFor="my-file" className="input-file-trigger">
            Foto de sua biometria...
          </label>

          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#036424" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
    </div>
  );
}
