import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getToken from "../utilities/GetToken";
import PostForm from "../components/PostForm";
import HeaderBar from "../components/HeaderBar";
import "../style/pages-style/UserProfilPage.css"

const UserProfilPage = () => {
  const apiUrl = String(import.meta.env.VITE_API_URL);
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserProfile = async () => {
    /* localStorage.removeItem("token");
    localStorage.removeItem("refreshToken"); */
      const token = await getToken();
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const profileResponse = await axios.get(`${apiUrl}api/getUserProfil/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Profile Response:', profileResponse.data);
        setProfile(profileResponse.data.details[0]);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setMessage(`Erreur : ${error.message}`);
      }
    };
    fetchUserProfile();
  }, [navigate, apiUrl]);
  return (
    <>
      <div className="User-Profil">
        <HeaderBar />
      </div>
      <div className="User-Profil2">
        <PostForm profile={profile} />
      </div>
      {message && <p className="message">{message}</p>}
    </>
  );
};
export default UserProfilPage;