import React, { useState } from 'react';
import Table from './Table';

function MyApp() {
    // Initialize state with initial character data using useState hook
    const [characters, setCharacters] = useState([
        { name: "Charlie", job: "Janitor" },
        { name: "Mac", job: "Bouncer" },
        { name: "Dee", job: "Aspiring actress" },
        { name: "Dennis", job: "Bartender" }
    ]);

    // Function to remove a character by index
    function removeCharacter(index) {
        const updatedCharacters = characters.filter((character, i) => i !== index);
        setCharacters(updatedCharacters); // Update state
    }

    return (
        <div className="container">
            <Table characterData={characters} removeCharacter={removeCharacter} />
        </div>
    );
}

export default MyApp;
