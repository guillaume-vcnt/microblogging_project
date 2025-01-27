import "../style/components-style/LogOutButton.css";

const LogOutButton = (handleLogout) => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");

  return (
    <div className="deco-button">
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default LogOutButton;
