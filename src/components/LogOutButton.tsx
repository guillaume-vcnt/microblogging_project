import "../style/components-style/LogOutButton.css";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  };

  return (
    <div className="deco-button">
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default LogOutButton;
