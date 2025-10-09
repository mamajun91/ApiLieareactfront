import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import PersonList from "./personVue/personList";
import PersonForm from "./personVue/personForm";
import PersonEdit from "./personVue/personEdit";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header className="p-3 bg-light border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <h2 className="m-0">Gestion Personnes</h2>
          <nav>
            <Link to="/persons" className="btn btn-outline-primary me-2">
              Liste
            </Link>
            <Link to="/persons/create" className="btn btn-primary">
              Ajouter
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/persons" replace />} />
          <Route path="/persons" element={<PersonList />} />
          <Route path="/persons/create" element={<PersonForm />} />
          <Route path="/persons/:id/edit" element={<PersonEdit />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
