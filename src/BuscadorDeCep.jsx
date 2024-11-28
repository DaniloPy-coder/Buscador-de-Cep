import { FiSearch } from "react-icons/fi";
import "./css/styles.css";
import { useState } from "react";

import api from "./services/api";

function BuscadorDeCep() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSearch() {
    if (input === "") {
      setErrorMessage("Por favor, insira um CEP válido");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);

      if (!response.data || response.data.erro) {
        setErrorMessage("CEP não encontrado. Verifique e tente novamente.");
      }

      setCep(response.data);
      setErrorMessage("");
      setInput("");
    } catch {
      setErrorMessage("Ocorreu um erro ao buscar o CEP. Tente novamente.");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de Cep</h1>

      <div className="container-input">
        <input
          type="number"
          placeholder="Digite o cep..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="btn-search" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default BuscadorDeCep;
