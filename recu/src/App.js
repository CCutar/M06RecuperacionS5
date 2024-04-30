import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './App.css'; // Archivo CSS para el estilo de la tabla y la paginación

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Página actual de la paginación
  const [charactersPerPage] = useState(5); // Número de personajes por página

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://thronesapi.com/api/v2/Characters');
        setCharacters(response.data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  // Calcular el índice del último personaje en la página actual
  const indexOfLastCharacter = (currentPage + 1) * charactersPerPage;
  // Calcular el índice del primer personaje en la página actual
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  // Obtener los personajes para la página actual
  const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  // Cambiar de página
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="character-list-container">
      <h1>Lista de Personajes</h1>
      <table className="character-table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Título</th>
          </tr>
        </thead>
        <tbody>
          {currentCharacters.map(character => (
            <tr key={character.id}>
              <td><img src={character.imageUrl} alt={character.fullName} /></td>
              <td>{character.id}</td>
              <td>{character.fullName}</td>
              <td>{character.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'Anterior'}
        nextLabel={'Siguiente'}
        breakLabel={'...'}
        pageCount={Math.ceil(characters.length / charactersPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default CharacterList;
