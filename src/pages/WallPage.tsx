import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getToken from "../utilities/GetToken";
import HeaderBar from "../components/HeaderBar";
import PostUser from "../components/PostUser";
const Wall = () => {
  const apiUrl = String(import.meta.env.VITE_API_URL);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      const token = await getToken();
      if (!token) {
        navigate("/login");
        return;
      }
      const fetchData = async (token) => {
        try {
          const profileResponse = await axios.get(`${apiUrl}api/getUserProfil/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Profile Response:', profileResponse.data);
          setProfile(profileResponse.data.details[0]);
          const postsResponse = await axios.get(`${apiUrl}api/posts/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Posts Response:', postsResponse.data);
          //const sortedPosts = postsResponse.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          const sortedPosts = postsResponse.data.sort((a, b) => b.post_id - a.post_id);
          console.log('sortedPosts Response:', sortedPosts);
          setPosts(sortedPosts || []);
          //setPosts(postsResponse.data || []);
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
          setMessage(`Erreur : ${error.message}`);
        }
      };
      try {
        await fetchData(token);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setMessage(`Erreur : ${error.message}`);
      } };
    fetchProfileAndPosts();
  }, [navigate, apiUrl]);
  return (
    <div className="Wall">
      <HeaderBar />
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <PostUser key={index} post={post} />
        ))
      ) : (
        <p>Chargement des posts...</p>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};
export default Wall;