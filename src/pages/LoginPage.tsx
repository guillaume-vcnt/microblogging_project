import Titre from "../components/Titre";
import "../style/pages-style/LoginPage.css";
import Authentication from "../utilities/Authentication";

const LoginPage = () => {

  return (
    <div className="Login-page">
      <Authentication />
    </div>
  );
};

export default LoginPage;
