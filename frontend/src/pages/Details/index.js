import React from "react";
import { useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.css";

import logoImg from "../../assets/logo.png";
import Director from "../../components/Position/Director";
import Public from "../../components/Position/Public";
import Minister from "../../components/Position/Minister";

export default function Details(props) {
  const username = localStorage.getItem("name");
  const history = useHistory();

  function goToFeed() {

    history.push("/");
  }
  
  function Position () {
    const farm  = props.location.state
    if(localStorage.getItem('position') === 'director') {
      return <Director farm={farm} />
    } else if (localStorage.getItem('position') === 'minister') {
      return <Minister farm={farm} />
    } else {
      return <Public farm={farm} />
    }
  }

  return (
    <div className="details-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem vindo {username}</span>



        <button onClick={goToFeed}>
          <FiArrowLeft size={18} color="#036424" />
        </button>
      </header>

      <h1>Detalhes da fazenda</h1>

      <div className="details-content">
        <Position />
      </div>
    </div>
  );
}
