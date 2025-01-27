import axios from "axios";

const apiUrl = String(import.meta.env.VITE_API_URL);

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return null;
    }

    const response = await axios.post(`${apiUrl}api/token/refresh/`, {
      refresh: refreshToken,
    });

    const newAccessToken = response.data.access;
    localStorage.setItem("token", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token :", error);
    return null;
  }
};

export default refreshToken;
