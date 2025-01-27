import LogOutButton from "./LogOutButton";
import "../style/components-style/UserDetails.css";

const UserDetails = () => {
  return (
    <div className="user-detail-content">
      <div className="avatar-user1">
        <img className="avatar-user1" src={Avatar} alt="Photo-de-profil" />
      </div>
      <br></br>
      <br></br>
      <h2>George Clooney</h2>
      <br></br>
      <p>Jaime boire du cafe etc....</p>
      <br></br>
      <br></br>
      <LogOutButton />
    </div>
  );
};

export default UserDetails;
