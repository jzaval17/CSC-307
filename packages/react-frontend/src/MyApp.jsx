import React, { useState } from 'react';
import Table from './Table';
import Form from "./Form";

function MyApp() {
    // Initialize state with initial character data using useState hook
    const [characters, setCharacters] = useState([]);

    // Function to remove a character by index
    function removeCharacter(index) {
        const updatedCharacters = characters.filter((character, i) => i !== index);
        setCharacters(updatedCharacters); // Update state
    }

    function updateList(person) {
        setCharacters([...characters, person]);
    }

    return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeCharacter} // Corrected the function reference here
          />
          <Form handleSubmit={updateList}/>
        </div>
      );
}

export default MyApp;
