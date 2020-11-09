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
      </li>
    </ul>
  );
}

export default Director;
