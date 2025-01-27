import PropTypes from "prop-types";
import { FaUserAlt, FaLock } from "react-icons/fa";
import "../style/components-style/LoginForm.css";
import "../style/components-style/Titre.css";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  errors,
}) => {
  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h1>BipBip.</h1>

        <div className="input-box">
          <input
            type="email"
            id="email"
            placeholder="Email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className={errors?.email ? "input-error" : ""}
            required
          />

          <FaUserAlt className="icon" />

          {errors?.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="input-box">
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={errors?.password ? "input-error" : ""}
            required
          />

          <FaLock className="icon" />

          {errors?.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <button type="submit">Se connecter</button>

        <div className="register-link">
          <br></br>
          <hr />
          <br></br>
          <p>
            Pas de compte ?&nbsp;<a href="/registrer">Inscrivez-vous ici</a>
          </p>
          <p>
            Mot de passe oublié ?&nbsp;
            <a href="/resetPassword">Réinitialiser</a>
          </p>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default LoginForm;
