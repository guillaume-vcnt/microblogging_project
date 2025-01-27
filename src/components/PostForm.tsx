import { useState } from 'react';
import "../style/components-style/PostForm.css";
import UserDetail from "./UserDetails";

const PostForm = () => {
    const [content, setContent] = useState('');
  
    const handleContentChange = (e) => {
      setContent(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Post Submitted', {content});
    };

  return (
    <div className='profil-elm'>
        <UserDetail />
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
    </div>
  );
};

export default PostForm;
