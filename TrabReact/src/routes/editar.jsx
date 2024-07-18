import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('O nome do Pokémon é obrigatório'),
  species: Yup.string().required('A espécie do Pokémon é obrigatória'),
  hp: Yup.number().required('O HP do Pokémon é obrigatório'),
  abilities: Yup.string().required('As habilidades do Pokémon são obrigatórias'),
  attack: Yup.number().required('O poder de ataque do Pokémon é obrigatório'),
  defense: Yup.number().required('O poder de defesa do Pokémon é obrigatório'),
  speed: Yup.number().required('O poder de velocidade do Pokémon é obrigatório'),
});

const Editar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editedPokemon, setEditedPokemon] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      axios.get(`http://localhost:3001/api/Poke/${id}`)
        .then((response) => {
          setEditedPokemon(response.data);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados da API:', error);
        });
    } else {
      setIsEditing(false);
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPokemon((prevPokemon) => ({ ...prevPokemon, [name]: value }));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validationSchema.validate(editedPokemon, { abortEarly: false })
      .then(() => {
        const apiUrl = isEditing
          ? `http://localhost:3001/api/Poke/${id}`
          : 'http://localhost:3001/api/Poke';

        const method = isEditing ? 'put' : 'post';

        axios[method](apiUrl, editedPokemon)
          .then((response) => {
            console.log(response.status);
            if (response.status === 200) alert("Salvo!");
            if (response.status === 201) alert("Pokemon adicionado!");
          })
          .catch((error) => {
            console.error('Erro ao salvar os dados:', error);
          });
      })
      .catch((validationError) => {
        const errors = {};
        validationError.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setValidationErrors(errors);
      });
  };

  return (
    <div className="edit-pokemon-form">
      <h2>{isEditing ? 'Editar Pokémon' : 'Adicionar Pokémon'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome:</label>
        {validationErrors.name && <span className="error-message">{validationErrors.name}</span>}
        <input type="text" id="name" name="name" value={editedPokemon.name || ''} onChange={handleInputChange} />

        <label htmlFor="species">Espécie:</label>
        {validationErrors.species && <span className="error-message">{validationErrors.species}</span>}
        <input type="text" id="species" name="species" value={editedPokemon.species || ''} onChange={handleInputChange} />

        <label htmlFor="hp">HP:</label>
        {validationErrors.hp && <span className="error-message">{validationErrors.hp}</span>}
        <input type="number" id="hp" name="hp" value={editedPokemon.hp || ''} onChange={handleInputChange} />

        <label htmlFor="abilities">Habilidades:</label>
        {validationErrors.abilities && <span className="error-message">{validationErrors.abilities}</span>}
        <input type="text" id="abilities" name="abilities" rows={5} value={editedPokemon.abilities || ''} onChange={handleInputChange} style={{ resize: 'vertical' }} />

        <label htmlFor="attack">Ataque:</label>
        {validationErrors.attack && <span className="error-message">{validationErrors.attack}</span>}
        <input type="number" id="attack" name="attack" value={editedPokemon.attack || ''} onChange={handleInputChange} />

        <label htmlFor="defense">Defesa:</label>
        {validationErrors.defense && <span className="error-message">{validationErrors.defense}</span>}
        <input type="number" id="defense" name="defense" value={editedPokemon.defense || ''} onChange={handleInputChange} />

        <label htmlFor="speed">Velocidade:</label>
        {validationErrors.speed && <span className="error-message">{validationErrors.speed}</span>}
        <input type="number" id="speed" name="speed" value={editedPokemon.speed || ''} onChange={handleInputChange} />

        <button type="submit">{isEditing ? 'Salvar' : 'Adicionar'}</button>
        <button type="button" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default Editar;
