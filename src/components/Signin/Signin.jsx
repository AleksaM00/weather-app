import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Signin.module.css";

import Bck from "../../assets/images/loginBck.png";
import { Link } from "react-router-dom";

import {
  signInAuthUserWithEmailAndPassword,
  userDocument,
  signInWithGoogle,
} from "../../firebase";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const signInWithGoogleHandler = () => {
    const { user } = signInWithGoogle();
    const res = userDocument(user);

    if (res) {
      navigate("/weather");
    } else return;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      userDocument(user);
      if (user) {
        navigate("/weather");
      }
    } catch (error) {
      setError("Wrong Email or password");
    }
  };

  return (
    <section className={classes.signin}>
      <div className={classes.signinLeft}>
        <img src={Bck} alt="login background" />
      </div>
      <div className={classes.signinRight}>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          {error && <span className={classes.error}>{error}</span>}
          <label>Email:</label>
          <input
            value={email}
            onChange={emailHandler}
            type="email"
            placeholder="Your Email"
            required
          />

          <label>Password:</label>
          <input
            value={password}
            onChange={passwordHandler}
            type="password"
            placeholder="Your password"
            required
          />

          <div className={classes.actions}>
            <button type="submit">LogIn</button>
          </div>
          <button type="submit" onClick={signInWithGoogleHandler}>
            Google account
          </button>
          <Link to="/signup">Create new account</Link>
        </form>
      </div>
    </section>
  );
};

export default Signin;
