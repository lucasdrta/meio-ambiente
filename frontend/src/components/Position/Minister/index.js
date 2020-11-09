import React from "react";
import './styles.css'

function Director({ farm }) {
  return (
    <ul>
      <li>
        <strong>Proprietário da fazenda:</strong>
        <p>{farm.owner}</p>

        <strong>CNPJ:</strong>
        <p>{farm.cnpj}</p>

        <strong>Localização:</strong>
        <p>{farm.location}</p>

        <strong>Culturas:</strong>
        <p>{farm.culture} </p>

        <strong>Agrotóxicos:</strong>
        <p>{farm.pesticide}</p>

        <strong>Doações no ultimo ano:</strong>
        <p>{farm.donation}</p>
      </li>
    </ul>
  );
}

export default Director;
