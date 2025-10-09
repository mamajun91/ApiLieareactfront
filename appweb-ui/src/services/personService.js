import api from "../configAxios/axios.create";

// Petit wrapper pour récupérer response.data et normaliser les erreurs
function unwrap(res) {
  return res.data;
}

function handleAxiosError(err) {
  if (err.response) {
    const message = err.response.data?.message || err.response.statusText || 'Erreur serveur';
    const e = new Error(message);
    e.status = err.response.status;
    throw e;
  }
  if (err.request) {
    const e = new Error('Aucune réponse du serveur');
    e.status = 0;
    throw e;
  }
  throw new Error(err.message);
}

export async function getPersons() {
  try {
  const res = await api.get('/persons');
    const payload = unwrap(res);

    // Normaliser la réponse pour toujours retourner un tableau
    if (Array.isArray(payload)) return payload;
    if (!payload) return [];
    if (Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload.persons)) return payload.persons;
    if (Array.isArray(payload.items)) return payload.items;
    // Si c'est un objet simple représentant une seule personne, le retourner en tableau
    if (typeof payload === 'object') return [payload];
    return [];
  } catch (err) {
    handleAxiosError(err);
  }
}

export async function getPerson(id) {
  try {
  const res = await api.get(`/person/${id}`);
    return unwrap(res);
  } catch (err) {
    handleAxiosError(err);
  }
}

export async function savePerson(person) {
  try {
  const res = await api.post('/person', person);
    return unwrap(res);
  } catch (err) {
    handleAxiosError(err);
  }
}

export async function deletePerson(id) {
  try {
  await api.delete(`/person/${id}`);
    return true;
  } catch (err) {
    handleAxiosError(err);
  }
}

