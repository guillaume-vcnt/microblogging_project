import { UserProfileLink } from "../utilities/Navigation";
import SearchBar from "./SearchBar";
import TitreHeader from "./TitreHeader";
import "../style/components-style/HeaderBar.css";

const HeaderBar = () => {
  return (
    <div className="header-bar">
      <TitreHeader />
      <SearchBar />
      <UserProfileLink />
    </div>
  );
};

export default HeaderBar;
