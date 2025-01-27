import "../style/pages-style/UserProfilPage.css";
import PostForm from "../components/PostForm";
import HeaderBar from "../components/HeaderBar";

const UserProfilPage = () => {
  return (
    <>
      <div className="User-Profil">
        <HeaderBar />
      </div>
      <div className="User-Profil2">
        <PostForm />
      </div>
    </>
  );
};

export default UserProfilPage;
