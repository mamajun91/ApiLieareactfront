import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8888/persons",
  headers: {
    "Content-type": "application/json"
  }
});