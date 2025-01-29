import { useState, useEffect } from "react";
import "../style/components-style/PostForm.css";
import axios from 'axios';
import getToken from "../utilities/GetToken";
import UserDetails from "../components/UserDetails";
const PostForm = ({ profile }) => {
  const apiUrl = String(import.meta.env.VITE_API_URL);
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken();
    if (!token) {
      setMessage("Vous devez être connecté pour publier un post.");
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}api/posts/create/`, {
        content,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Post Submitted', response.data);
      setContent(''); // Réinitialiser le contenu après l'envoi
      setMessage("Post publié avec succès.");
    } catch (error) {
      console.error("Erreur lors de l'envoi du post :", error);
      setMessage("Erreur lors de l'envoi du post.");
    }
  };
  return (
    <div className='profil-elm'>
      <UserDetails profile={profile} />
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="post-content">
            <textarea
              id="content"
              name="content"
              placeholder="Quoi de neuf ?"
              rows="5"
              value={content}
              onChange={handleContentChange}
              required
            />
          </div>
          <div className="submit-post">
            <button type="submit">Publier</button>
          </div>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};
export default PostForm;