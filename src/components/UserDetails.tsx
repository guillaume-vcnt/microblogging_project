import LogOutButton from "../components/LogOutButton";
import "../style/components-style/UserDetails.css";
const UserDetails = ({ profile }) => {
  return (
    <div className="user-detail-content">
      {profile ? (
        <>
          <div className="avatar-user1">
            <img className="avatar-user1" src={`https://microblogging-back-end.vercel.app/api/media/images/${profile.image}`} alt="Profil" />
          </div>
          <h2>{profile.username}</h2>
          <p>{profile.bio}</p>
          <p>Créé le : {profile.created_at}</p>
          <LogOutButton />
        </>
      ) : (
        <p>Chargement du profil...</p>
      )}
    </div>
  );
};
export default UserDetails;