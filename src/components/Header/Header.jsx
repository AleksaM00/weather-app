import React, { Fragment, useContext } from "react";
import classes from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import { signOutUser } from "../../firebase";

const Header = () => {
  const { currentUser } = useContext(UserContext);
  const { logOut } = useContext(UserContext);
  const navigate = useNavigate();

  const logOutHandler = async () => {
    try {
      await signOutUser();
      navigate("/");
    } catch (error) {}
  };
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>WEATHER APP.</h1>
        <nav>
          <ul>
            {currentUser ? (
              <>
                <NavLink to="/weather"> Weather</NavLink> : ""
                <NavLink onClick={logOutHandler}> Sign Out</NavLink>
              </>
            ) : (
              <NavLink to="/"> LogIn</NavLink>
            )}
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
