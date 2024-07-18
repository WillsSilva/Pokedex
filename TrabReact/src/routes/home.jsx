import React from 'react';
import { useFindPokes } from './../hooks/useFindPokes';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const { data, loading, error, refetch } = useFindPokes();
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  const onEditPoke = (id) => {
    navigate(`/editar/${id}`);
  };

  const onAddPoke = () => {
    navigate('/editar');
  };

  const onDeletePoke = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/Poke/${id}`);
      refetch(); // Recarrega os dados após a exclusão
    } catch (error) {
      console.error(error);
      alert("Erro ao apagar o Pokemon!");
    }
  };

  const onCreateRandomPokedexEntry = async () => { // Função para criar um novo registro aleatório
    try {
      await axios.post(`http://localhost:3001/api/Poke/CreateRandom`);
      refetch(); // Recarrega os dados após a criação
    } catch (error) {
      console.error(error);
      alert("Erro ao criar o Pokemon!");
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Lista de Pokemons</h1>
      <button id="Add" onClick={onAddPoke}>Adicionar</button>
      <button onClick={onCreateRandomPokedexEntry}>Criar Pokemon Aleatório</button> {/* Botão para criar um novo registro aleatório */}      
      <div className="poke-list">
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <PokeItem
              key={item.id} // Use um campo único como `id` em vez de `_id`
              title={item.name}
              species={item.species}
              onEdit={() => onEditPoke(item.id)} // Consistência com o uso do `id`
              onDelete={() => onDeletePoke(item.id)} // Consistência com o uso do `id`
            />
          ))}
      </div>
    </div>
  );
};

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <img src="https://media.tenor.com/5tLX-5mJCwgAAAAi/pichu-pokemon.gif" alt="Loading" />
    </div>
  );
}

function ErrorDisplay({ error }) {
  return <div className="error-container">{error}</div>;
}

function PokeItem({ title, species, onDelete, onEdit }) {
  return (
    <div className="poke-item">
      <strong className="poke-title">{title}</strong>
      <img src={`https://projectpokemon.org/images/normal-sprite/${title.toLowerCase()}.gif`} alt={title} style={{ width: '50px', height: '50px' }} />
      <p className="poke-description">{species}</p>
      <div className="button-group">
        <button onClick={onEdit} id="Editar">
          <Link to="/" id="EditarL">Editar</Link>
        </button>
        <button onClick={onDelete} id="Excluir">Excluir</button>
      </div>
    </div>
  );
}

export default Home;
