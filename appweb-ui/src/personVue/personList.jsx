import React, { useEffect, useState } from "react";
import { getPersons, deletePerson } from "../services/personService"; 
import { useNavigate } from "react-router-dom";

function PersonList() {
  const [persons, setPersons] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    loadPersons();
  }, []);

  const loadPersons = async () => {
    try {
      const data = await getPersons();
      setPersons(data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette personne ?")) {
      try {
        await deletePerson(id);
        loadPersons();
      } catch (err) {
        console.error('Erreur lors de la suppression :', err);
        alert(err.message || 'Erreur lors de la suppression');
      }
    }
  };

  return (
    <div className="container mt-2">
      <h1 className="mb-4">Liste des Personnes</h1>

      {/* Bouton pour ajouter une personne */}
      <div className="mb-3">
        <button
          className="btn btn-success"
          onClick={() => navigate("/persons/create")}
        >
          ➕ Ajouter une personne
        </button>
      </div>

      {/* Tableau Bootstrap */}
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/persons/${person.id}/edit`)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(person.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PersonList;
