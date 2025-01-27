import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginForm from "../components/LoginForm";


const Authentication = () => {
  const apiUrl = String(import.meta.env.VITE_API_URL);

  const [email, setEmail] = useState("georgesClooney@test.com");
  const [password, setPassword] = useState("whatelse1");

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  
  useEffect(() => {
    localStorage.setItem("coucou", "allo")
    console.log(localStorage)
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/wall");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: "post",
        mode: "no-cors",
        url: `${apiUrl}api/login/`,
        data: { email, password },
        withCredentials: false,
      });

      console.log("😆", response);

      if (response.data.errors) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...response.data.errors,
        }));
      } else {
        localStorage.setItem("token", response.data.token);
        navigate("/wall");
        setMessage("Connexion réussie !");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setMessage(`Erreur : ${error.message}`);
    }
  };

  return (
    <>
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        errors={errors}
      />
      {message && <p>{message}</p>}
    </>
  );
};

export default Authentication;