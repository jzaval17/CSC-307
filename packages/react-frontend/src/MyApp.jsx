import React, { useState, useEffect } from 'react'; // Consolidate React imports
import Table from './Table';
import Form from "./Form";

function MyApp() {
    // Initialize state with initial character data using useState hook
    const [characters, setCharacters] = useState([]);

    // Function to remove a character by index
    function removeCharacter(characterId) {
      fetch(`http://localhost:8000/users/${characterId}`, {
          method: 'DELETE'
      })
      .then(response => {
          if (response.status === 204) {
              setCharacters(prevCharacters => prevCharacters.filter(character => character.id !== characterId));
          } else if (response.status === 404) {
              console.error('User not found');
              alert('User not found.'); // Provide feedback to the user
          } else {
              throw new Error('Failed to delete the character');
          }
      })
      .catch(error => {
          console.error('Error deleting user:', error);
          alert('Error deleting user.'); // Provide user feedback
      });
    }
      
    function fetchUsers() {
      return fetch("http://localhost:8000/users")
      .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
      .then(json => setCharacters(json.users_list))
      .catch(error => {
        console.error('Error fetching users:', error);
        alert('Failed to fetch users.'); // Provide feedback to the user
      
      });
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to update the list of characters
    function updateList(person) {
      postUser(person)
        .then((response) => {
          if (response.status === 201) {
            fetchUsers();
          } else {
            throw new Error("Failed to add user");
          }
        })
        .catch((error) => {
          console.error("Error adding user:", error);
          alert("Failed to add user."); // Provide feedback to the user
        });
      
    }
      
    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }
  
    return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeCharacter}
          />
          <Form handleSubmit={updateList}/>
        </div>
      );
}

export default MyApp;
