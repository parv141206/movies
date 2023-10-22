import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
    console.log("Logged Out");
  };

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom border-1 border-light "
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0)",
        backdropFilter: "blur(5px)",
        zIndex: 999,
      }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          Movies.com
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/movies">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light mx-3"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    disabled="disabled"
                    className="btn btn-dark text-white fw-bolder"
                  >
                    Welcome,{auth.currentUser.displayName}
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
