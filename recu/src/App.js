import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CharacterList() {
  const [characters, setCharacters] = useState([]);

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

  return (
    <div>
      <h1>Lista de Personajes</h1>
      <ul>
        {characters.map(character => (
          <li key={character.id}>
            <img src={character.imageUrl} alt={character.fullName} />
            <p>{character.fullName}</p>
            <p>{character.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharacterList;
