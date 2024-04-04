import React from 'react';
import { useFindPokes } from './../hooks/useFindPokes';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const { data, loading, error } = useFindPokes();
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  const onEditBook = (id) => {
    navigate(`/editar/${id}`);
  };

  const onAddBook = () => {
    navigate('/editar'); 
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Lista de Pokemons</h1>
      <div className="book-list">
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <BookItem
              key={item.id}
              title={item.name}
              species={item.species}
              onEdit={() => onEditBook(item.id)}
              onDelete={() => onDeleteBook(item.id)}
            />
          ))}
      </div>
      <button id="Add" onClick={onAddBook}>Adicionar</button>
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

function BookItem({ title, species, onDelete, onEdit }) {
  return (
    <div className="book-item">
      <strong className="book-title">{title}</strong>
      <img src={`https://projectpokemon.org/images/normal-sprite/${title}.gif`} alt={title} style={{ width: '50px', height: '50px' }} />
      <p className="book-description">{species}</p>
      <div className="button-group">
        <button onClick={onEdit} id="Editar">
          <Link to="/" id="EditarL">Editar</Link>
        </button>
        <button onClick={onDelete} id="Excluir">Excluir</button>
      </div>
    </div>
  );
}

function onDeleteBook(id) {
  axios.delete(`http://localhost:3000/api/Books/${id}`)
    .then(response => {
      console.log(response.status);
      alert("Livro apagado!");
    })
    .catch(error => {
      console.error(error);
      alert("Erro ao apagar o livro!")
    });
}

export default Home;
