import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import * as Yup from 'yup'; // Importe a biblioteca Yup para validação

const validationSchema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
  pageCount: Yup.number().min(0, 'O número de páginas deve ser maior ou igual a 0').required('O número de páginas é obrigatório'),
  excerpt: Yup.string().required('O excerto é obrigatório'),
  publishDate: Yup.date().required('A data de publicação é obrigatória'),
});

const Editar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editedBook, setEditedBook] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({}); // Estado para rastrear erros de validação

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      axios.get(`https://fakerestapi.azurewebsites.net/api/v1/Books/${id}`)
        .then((response) => {
          setEditedBook(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setIsEditing(false);
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validationSchema.validate(editedBook, { abortEarly: false })
      .then(() => {
        const apiUrl = isEditing
          ? `http://localhost:3000/api/Books/${id}`
          : 'http://localhost:3000/api/Books';

        const method = isEditing ? 'put' : 'post';

        axios[method](apiUrl, editedBook)
          .then((response) => {
            console.log(response.status);
            if (response.status = '200') alert ("Salvo!");
          })
          .catch((error) => {
            console.error(error);
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

  const formattedDate = editedBook.publishDate
    ? format(new Date(editedBook.publishDate), "yyyy-MM-dd'T'HH:mm")
    : '';

  return (
    <div className="edit-book-form">
      <h2>{isEditing ? 'Editar Livro' : 'Adicionar Livro'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titulo:</label>
        {validationErrors.title && <span className="error-message">{validationErrors.title}</span>}
        <input type="text" id="title" name="title" value={editedBook.title || ''} onChange={handleInputChange} />

        <label htmlFor="description">Descrição:</label>
        {validationErrors.description && <span className="error-message">{validationErrors.description}</span>}
        <textarea id="description" name="description" rows={5} value={editedBook.description || ''} onChange={handleInputChange} style={{ resize: 'vertical' }} />

        <label htmlFor="title">Numero de páginas:</label>
        {validationErrors.pageCount && <span className="error-message">{validationErrors.pageCount}</span>}
        <input type="number" id="pages" name="pageCount" value={editedBook.pageCount || ''} onChange={handleInputChange} min={0} step={1} />

        <label htmlFor="excerto">Excerto:</label>
        {validationErrors.excerpt && <span className="error-message">{validationErrors.excerpt}</span>}
        <textarea id="excerto" name="excerpt" rows={10} value={editedBook.excerpt || ''} onChange={handleInputChange} style={{ resize: 'vertical' }} />

        <label htmlFor="title">Data da publicação:</label>
        {validationErrors.publishDate && <span className="error-message">{validationErrors.publishDate}</span>}
        <input type="datetime-local" id="publishDate" name="publishDate" value={formattedDate} onChange={handleInputChange} />

        <button type="submit">{isEditing ? 'Salvar' : 'Adicionar'}</button>
        <button type="button" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default Editar;
