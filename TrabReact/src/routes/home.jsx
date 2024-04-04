import React from 'react';
import { useFindBooks } from './../hooks/useFindBooks';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const { data, loading, error } = useFindBooks();
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
      <h1 className="app-title">Lista de Livros</h1>
      <button id="Add" onClick={onAddBook} >Adicionar</button>
      <ul className="book-list">
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <BookItem
              key={item.id}
              title={item.title}
              description={item.description}
              onEdit={() => onEditBook(item.id)}
              onDelete={() => onDeleteBook(item.id)}
            />
          ))}
      </ul>
    </div>
  );
};

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <img src="https://media.tenor.com/6gHLhmwO87sAAAAj/gg.gif" alt="Loading" />
    </div>
  );
}

function ErrorDisplay({ error }) {
  return <div className="error-container">{error}</div>;
}

function BookItem({ title, description, onDelete, onEdit }) {
  const [showDescription, setShowDescription] = React.useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  }

  return (
    <li className="book-item">
      <strong className="book-title">{title}</strong>
      {showDescription && <p className="book-description">{description}</p>}
      <button onClick={toggleDescription} id="MostarOcultar">Mostrar/Esconder Descrição</button>
      <button onClick={onEdit} id="Editar">
        <Link to="/" id="EditarL">Editar</Link>
      </button>
      <button onClick={onDelete} id="Excluir">Excluir</button>          
    </li>
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
