import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getPerson, savePerson } from "../services/personService";

function PersonEdit() {
  const { id } = useParams(); // récupère l'ID depuis l'URL
  const [person, setPerson] = useState({ id: "", firstName: "", lastName: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Charger les données de la personne existante
  useEffect(() => {
    async function fetchPerson() {
      try {
        const data = await getPerson(id);
        setPerson(data);
      } catch (err) {
        console.error(err);
        if (err?.status === 404) {
          setError("❌ Personne introuvable (404). Retour à la liste dans quelques instants.");
          setTimeout(() => navigate('/persons'), 3000);
        } else {
          setError("❌ Impossible de charger la personne.");
        }
      }
    }
    fetchPerson();
  }, [id]);

  // Gestion du changement de champ
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (person.firstName.length < 2 || person.lastName.length < 2) {
      setError("⚠️ Prénom et nom doivent avoir au moins 2 caractères.");
      return;
    }

    try {
      await savePerson(person); // update côté backend
      navigate("/persons"); // retour à la liste
    } catch (err) {
      console.error(err);
      setError("❌ Erreur lors de la sauvegarde.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Modifier une personne</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
            
            {/* Champ ID affiché mais non modifiable */}
            <div className="col-md-12">
              <label htmlFor="idDisplay" className="form-label">ID</label>
              <input
                type="text"
                id="idDisplay"
                className="form-control"
                value={person.id}
                readOnly
                disabled
              />
              <small className="form-text text-muted">
                L'identifiant ne peut pas être modifié.
              </small>
            </div>

            <div className="col-md-6">
              <label htmlFor="firstname" className="form-label">Prénom *</label>
              <input
                type="text"
                id="firstname"
                name="firstName"
                className="form-control"
                value={person.firstName}
                onChange={handleChange}
                required
                minLength="2"
                maxLength="50"
              />
              <div className="invalid-feedback">
                Veuillez saisir un prénom (2 caractères minimum).
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="lastname" className="form-label">Nom *</label>
              <input
                type="text"
                id="lastname"
                name="lastName"
                className="form-control"
                value={person.lastName}
                onChange={handleChange}
                required
                minLength="2"
                maxLength="50"
              />
              <div className="invalid-feedback">
                Veuillez saisir un nom (2 caractères minimum).
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <Link to="/persons" className="btn btn-outline-secondary">
                Annuler
              </Link>
              <button type="submit" className="btn btn-primary">
                Enregistrer les modifications
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default PersonEdit;
