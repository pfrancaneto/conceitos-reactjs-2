import React, { useEffect, useState } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    });
  }, [])

  async function handleAddRepository() {
    const newRepo = await api.post('repositories', {
      title: 'repository',
      url: 'www.github.com',
      techs: ['React Js'],
    });

    setRepository([...repositories, newRepo.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepository(repositories.filter(repository => repository.id != id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            <ul>
              <li><a href={repository.url} target="_blank">{repository.title}</a></li>
              <li>Likes: {repository.likes}</li>
            </ul>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
