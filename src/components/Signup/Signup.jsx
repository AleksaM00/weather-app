import React, { useState } from "react";
import classes from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import Bck from "../../assets/images/loginBck.png";
import {
  createUserAuthWithEmailAndPassword,
  userDocument,
} from "../../firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const ConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const { user } = await createUserAuthWithEmailAndPassword(
        email,
        password
      );
      await userDocument(user);
      navigate("/weather");
    } catch (error) {
      setError("Failed to create account");
      console.log(error.message);
    }
  };

  return (
    <section className={classes.signup}>
      <div className={classes.signupLeft}>
        <img src={Bck} alt="login background" />
      </div>
      <div className={classes.signupRight}>
        <h1>Register</h1>

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

          <label>Confirm Password:</label>
          <input
            value={confirmPassword}
            onChange={ConfirmPasswordHandler}
            type="password"
            placeholder="Confirm password"
            required
          />

          <button>Register</button>
          <Link to="/">Login with existing account</Link>
        </form>
      </div>
    </section>
  );
};

export default Signup;
