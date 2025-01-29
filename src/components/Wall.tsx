import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/pages-style/wall.css";
import refreshToken from "../utilities/RefreshToken";
const Wall = () => {
  const apiUrl = String(import.meta.env.VITE_API_URL);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const profileResponse = await axios.get(`${apiUrl}api/getUserProfil/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('profileResponse = ', profileResponse.data.details[0])
        setProfile(profileResponse.data.details[0]);
        console.log('profile = ', profile)
        const postsResponse = await axios.get(`${apiUrl}api/getUserpost/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('postsResponse = ', postsResponse.data.details)
        setPosts(postsResponse.data.details || []);  // Assurez-vous que posts est toujours un tableau
        console.log('posts = ', posts)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Si le token est expiré, essayez de le rafraîchir
          const newToken = await refreshToken();
          if (newToken) {
            try {
              const response = await axios.get(`${apiUrl}api/getUserProfil/`, {
                headers: {
                  Authorization: `Bearer ${newToken}`,
                },
              });
              setProfile(response.data.details[0]); // Accéder aux détails du profil
              console.log('profile = ', profile)
              const postsResponse = await axios.get(`${apiUrl}api/getUserpost/`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setPosts(postsResponse.data.details || []);  // Assurez-vous que posts est toujours un tableau
              console.log('posts = ', posts)
            } catch (innerError) {
              console.error("Erreur lors de la récupération du profil :", innerError);
              setMessage("Erreur lors de la récupération du profil après rafraîchissement du token.");
            }
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            navigate("/login");
            setMessage("Votre session a expiré. Veuillez vous reconnecter.");
          }
        } else {
          console.error("Erreur lors de la récupération du profil :", error);
          setMessage(`Erreur : ${error.message}`);
        }
      }
    };
    fetchProfileAndPosts();
  }, [navigate, apiUrl]);
  return (
    <div className="wall-container">
      <div className="profile-section">
        <h1>Profil de l'utilisateur</h1>
        {profile ? (
          <>
            <p>Nom d'utilisateur : {profile.username}</p>
            <p>Bio : {profile.bio}</p>
            <p>Créé le : {profile.created_at}</p>
            <img src={`${apiUrl}api//media/images/${profile.image}`} alt="Profil" />
          </>
        ) : (
          <p>Chargement du profil...</p>
        )}
      </div>
      <div className="posts-section">
        <h1>Posts de l'utilisateur</h1>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>Aucun post trouvé.</p>
        )}
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};
export default Wall;