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
  
  function Table(props) {
    return (
        <table>
          <TableHeader />
          <TableBody
            characterData={props.characterData}
            removeCharacter={props.removeCharacter}
          />
        </table>
      );
    }
      export default Table;
