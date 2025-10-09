import React, { useState } from "react";
import { savePerson } from "../services/personService";
import { useNavigate } from "react-router-dom";

function PersonForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (firstName.length < 2 || lastName.length < 2) {
      setError("Veuillez saisir un prénom et un nom (2 caractères minimum).");
      return;
    }

    try {
      await savePerson({ firstName, lastName });
      setMessage("✅ Personne créée avec succès !");
      setError(null);

      // retour auto à la liste après 2s
      setTimeout(() => navigate("/persons"), 2000);
    } catch (err) {
      console.error(err);
      setError("❌ Une erreur est survenue lors de la création.");
      setMessage(null);
    }
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Créer une nouvelle personne</h1>
        <button onClick={() => navigate("/persons")} className="btn btn-secondary">
          ↩ Retour à la liste
        </button>
      </div>

      {/* Messages */}
      {message && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {message}
          <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
        </div>
      )}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      {/* Formulaire */}
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
            <div className="col-md-6">
              <label htmlFor="firstname" className="form-label">Prénom *</label>
              <input
                type="text"
                id="firstname"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                minLength={2}
                maxLength={50}
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
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                minLength={2}
                maxLength={50}
              />
              <div className="invalid-feedback">
                Veuillez saisir un nom (2 caractères minimum).
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <button type="reset" className="btn btn-outline-secondary" onClick={() => { setFirstName(""); setLastName(""); }}>
                Réinitialiser
              </button>
              <button type="submit" className="btn btn-primary">
                Créer la personne
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PersonForm;
