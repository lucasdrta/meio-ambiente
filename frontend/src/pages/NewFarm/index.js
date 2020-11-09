import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import './styles.css'

export default function NewFarm() {
  const [owner, setOwner] = useState('')
  const [location, setLocation] = useState('')
  const [pesticide, setPesticide] = useState([])
  const [culture, setCulture] = useState([])
  const [cnpj, setCnpj] = useState('')
  const [donation, setDonation] = useState()

  const history = useHistory()

  async function handleNewFarm(e) {
    e.preventDefault()

    const data = {
      owner,
      location,
      pesticide,
      culture,
      cnpj,
      donation
    }

    try {
      await api.post('farms', data)
      history.push('/')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="new-farm-container">
      <div className="container">
        <section>
          <img src={logoImg} height="64" alt="Logo"/>

          <h1>Cadastro nova fazenda</h1>
          <p>Preencha este formulario para que a fazenda seja cadastrada com sucesso</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#036424"/>
            Voltar ao inicio
          </Link>
        </section>

        <form onSubmit={handleNewFarm}>
          <input 
            placeholder="Proprietário *"
            value={owner}
            onChange={e => setOwner(e.target.value)}
          />
          <input 
            placeholder="CNPJ *"
            value={cnpj}
            onChange={e => setCnpj(e.target.value)}
          />
          <input 
            placeholder="Localização *"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <input 
            placeholder="Culturas *"
            value={culture}
            onChange={e => setCulture(e.target.value)}
          />
          <input 
            placeholder="Agrotoxicos *"
            value={pesticide}
            onChange={e => setPesticide(e.target.value)}
          />
          <input 
            placeholder="Doações"
            value={donation}
            onChange={e => setDonation(e.target.value)}
          />
          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
