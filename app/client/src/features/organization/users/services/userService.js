// Chetan - 22/06/2026 - start 
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);

  return response.data;
};
// Chetan - 22/06/2026 - end

