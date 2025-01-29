import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import refreshToken from "../utilities/RefreshToken";
import "../style/pages-style/wall.css";

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
            "Content-Type": "application/json",
          },
        });

        console.log("PROFIL RESP", profileResponse);
        setProfile(profileResponse.data.details[0]);

        const postsResponse = await axios.get(`${apiUrl}api/getUserpost/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setPosts(postsResponse.data.details || []);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newToken = await refreshToken();
          if (newToken) {
            try {
              const response = await axios.get(`${apiUrl}api/getUserProfil/`, {
                headers: {
                  Authorization: `Bearer ${newToken}`,
                  "Content-Type": "application/json",
                },
              });
              setProfile(response.data.details[0]);

              const postsResponse = await axios.get(
                `${apiUrl}api/getUserpost/`,
                {
                  headers: {
                    Authorization: `Bearer ${newToken}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              setPosts(postsResponse.data.details || []);
            } catch (innerError) {
              console.error(
                "Erreur lors de la récupération du profil après rafraîchissement du token :",
                innerError
              );
              setMessage(
                "Erreur lors de la récupération du profil après rafraîchissement du token."
              );
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
    <div className="post-container">
      <img
        className="avatar-user"
        alt="Photo-de-profil"
        src={`https://microblogging-back-end.vercel.app/api/media/images/default.jpeg`}
      />
      <article className="article">
        <header>
          {profile ? (
            <p className="name-user">{profile.username}</p>
          ) : (
            <p>Chargement du profil...</p>
          )}
          <time className="date-user" dateTime="2024-12-13T14:52:24">
            <em>{posts.created_at}</em>
          </time>
        </header>

        <section className="content-user">
          {posts.length > 0 ? (
            posts.map((post) => <p key={post.id}>{post.content}</p>)
          ) : (
            <p>Aucun post trouvé.</p>
          )}
        </section>

        <footer>
          <button type="button" className="like-button">
            🤍
          </button>
          <button type="button" className="partage-button">
            Partage
          </button>
        </footer>
      </article>
    </div>
  );
};

export default Wall;
