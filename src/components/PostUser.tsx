import "../style/components-style/PostUser.css";

const PostUser = () => {
  return (
    <div className="post-container">
      <img className="avatar-user" src={Avatar} alt="Photo-de-profil" />
      <article className="article">
        <header>
          <p className="name-user">Par George Clooney</p>
          <time
            className="date-user"
            value="date"
            dateTime="2024-12-13T14:52:24"
          >
            <em>13 décembre 2024 à 14h52</em>
          </time>
        </header>
        <section>
          <p className="content-user">Aujourd'hui, j'ai bu un bon café...</p>
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
