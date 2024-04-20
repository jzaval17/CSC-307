import React from "react";

// Sub-component for Table Header
function TableHeader() {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Job</th>
            </tr>
        </thead>
    );
}

// Sub-component for Table Body
function TableBody(props) {
    const rows = props.characterData.map((row, index) => {
      return (
        <tr key={index}>
            <td>{row.name}</td>
            <td>{row.job}</td>
            <td>
                <button onClick={() => props.removeCharacter(index)}>
                Delete
            </button>
        </td>
    </tr>
      );
     }
    );
    return (
        <tbody>
          {rows}
         </tbody>
     );
  }
  
  function Table({ characterData, removeCharacter }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {characterData.map((character, index) => (
                    <tr key={character.id}>
                        <td>{character.id}</td>
                        <td>{character.name}</td>
                        <td>{character.job}</td>
                        <td><button onClick={() => removeCharacter(character.id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
      export default Table;
