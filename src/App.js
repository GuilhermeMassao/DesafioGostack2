import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {
    let data = {
      title: `Repositorio de data ${Date.now()}`,
      url: 'url do repositorio',
      techs: ['node', 'react']
    };

    api.post('repositories', data).then(response => setRepositories([...repositories, response.data]))
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      if (response.status === 204) {
        setRepositories([...repositories].filter(x => x.id !== id))
      }
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie =>
          <div key={repositorie.id}>
            <li >{repositorie.title}</li>
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
                </button>
          </div>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
