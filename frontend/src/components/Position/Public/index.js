import React from 'react'
import './styles.css'

function Public ({ farm }) {

  return (
    <ul>
        <li>
          <strong>Proprietário da fazenda:</strong>
          <p>{farm.owner}</p>

          <strong>Localização:</strong>
          <p>{farm.location}</p>

        </li>
      </ul>
  )
}

export default Public