import "../style/components-style/LogOutButton.css";

const LogOutButton = (handleLogout) => {
  // localStorage.removeItem("token");
  // localStorage.removeItem("refreshToken");
  // navigate("/login");
  // setMessage("Votre session a expiré. Veuillez vous reconnecter.");

  return (
    <div className="deco-button">
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default LogOutButton;
