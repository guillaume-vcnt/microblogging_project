// Le fichier App.jsx définit la structure de la page et contient les composants principaux de ton application. Tu peux également y importer des styles spécifiques en utilisant un fichier comme App.css.

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserProfilPage from "./pages/UserProfilPage";
import WallPage from "./pages/WallPage";
import RegistrerPage from "./pages/RegistrerPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/userprofil" element={<UserProfilPage />} />
        <Route path="/wall" element={<WallPage />} />
        <Route path="/registrer" element={<RegistrerPage />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;