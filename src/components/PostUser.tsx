import "../style/components-style/PostUser.css";

const PostUser = ({ post }) => {
  function handleClick() {
    window.location.href = "http://localhost:8000/userprofil";
  }

  return (
    <div className="post-container">
      <img className="avatar-user" onClick={handleClick}  alt="Photo-de-profil" />
      <article className="article">
        <header>
          <p className="name-user">Par {post.username}</p>
          <time className="date-user" dateTime={post.created_at}>
            <em>{new Date(post.created_at).toLocaleString("fr-FR")}</em>
          </time>
        </header>
        <section>
          <p className="content-user">{post.content}</p>
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
export default PostUser;
