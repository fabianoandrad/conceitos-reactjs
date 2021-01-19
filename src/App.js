import React, { useEffect, useState } from "react";
import api from "./services/api"
import "./styles.css";

function App() {
  const [repositories, setRepositories,] = useState([]) //add um novo repositorio usando o useState

  useEffect(()=>{ // cria um evento para ser disparado uma função assim que um componente for exibido em tela
    api.get('repositories').then(response=>{
      setRepositories(response.data)
    })

  }, [])

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: 'Umbriel',
      url: 'http://github.com/rocktseat/umbriel',
      techs: ['Node.JS', 'React.JS']
    })

    setRepositories([...repositories, response.data]) // seta para dentro de repositories o objeto dentro da const response

  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(repository => repository.id != id))/* aqui faz um filtro e mantém salvo em repositories os objetos que são diferentes do id selecionado, ou seja ele retira somente o objeto com o id selecionado. Obs o filter não altera a variável original no caso aqui a repositories, ele apenas cria uma outra array e se for o caso podemos salvar em repositories este novo array como no exemplo abaixo
    
    const newRepositories = repositories.filter(repository => repository.id != id)

    setRepositories(newRepositories)
    
    */
  }

  return (
    <div>
      <ul data-testid="repository-list">
    {repositories.map(repository =>( // não sei pq aqui não usa chaves, pode ficar sem nada ou colocar parenteses
              <li key={repository.id}>
              {repository.title}
    
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
    ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
