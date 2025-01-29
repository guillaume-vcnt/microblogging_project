import axios from "axios";
import refreshToken from "./RefreshToken"; // Assure-toi que le chemin est correct
const apiUrl = String(import.meta.env.VITE_API_URL);
const getToken = async () => {
  let token = localStorage.getItem("token");
  if (token) {
    try {
      // Vérifier si le token est valide en faisant une requête à un endpoint protégé
      await axios.post(`${apiUrl}api/token/verify/`, {
        token: token,
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Si le token n'est pas valide, tenter de le rafraîchir
        token = await refreshToken();
      } else {
        console.error("Erreur lors de la vérification du token :", error);
        return null;
      }
    }
  } else {
    // Si aucun token n'est présent, tenter de le rafraîchir
    token = await refreshToken();
  }
  return token;
};
export default getToken;