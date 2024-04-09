import React from 'react';
import { useFindPokes } from './../hooks/useFindPokes';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
//import { createRandomPokedexEntry } from '../../../Api/models/Pokemons'; // Importe aqui usando a sintaxe ES6

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
      alert("Pokemon excluído!");
      refetch(); // Recarrega os dados após a exclusão
    } catch (error) {
      console.error(error);
      alert("Erro ao apagar o Pokemon!");
    }
  };

  // const onCreateRandomPokedexEntry = async () => { // Função para criar um novo registro aleatório
  //   await createRandomPokedexEntry();
  //   refetch(); // Recarrega os dados após a criação
  // };

  return (
    <div className="app-container">
      <h1 className="app-title">Lista de Pokemons</h1>
      <div className="poke-list">
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <PokeItem
              key={item._id}
              title={item.name}
              species={item.species}
              onEdit={() => onEditPoke(item._id)}
              onDelete={() => onDeletePoke(item._id)}
            />
          ))}
      </div>
      <button id="Add" onClick={onAddPoke}>Adicionar</button>

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
      <img src={`https://projectpokemon.org/images/normal-sprite/${title}.gif`} alt={title} style={{ width: '50px', height: '50px' }} />
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
