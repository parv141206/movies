import React, { useEffect, useState } from "react";
import { signInWithGoogle } from "../firebase/functions";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(true); // Start loading indicator
        setTimeout(() => {
          navigate("/movies");
        }, 1000); // Delay for 1 second before redirecting
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signInWithGoogle();
    setIsLoading(true);
    navigate("/movies");
  };

  return (
    <div>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
          background:
            " linear-gradient(rgba(0,0,0,0),rgba(0,0,0,255)),url(https://wallpapers.com/images/hd/film-background-fwuwqptvgv1k0jco.jpg)",
        }}
      >
        <div className="row">
          <div className="col">
            <div
              className="card text-center bg-transparent p-5"
              style={{ backdropFilter: "blur(5px)" }}
            >
              <div className="card-body  ">
                <div className="display-1">
                  <svg
                    style={{ fill: "#ffffff" }}
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M448 32H361.9l-1 1-127 127h92.1l1-1L453.8 32.3c-1.9-.2-3.8-.3-5.8-.3zm64 128V96c0-15.1-5.3-29.1-14-40l-104 104H512zM294.1 32H201.9l-1 1L73.9 160h92.1l1-1 127-127zM64 32C28.7 32 0 60.7 0 96v64H6.1l1-1 127-127H64zM512 192H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192z" />
                  </svg>
                </div>
                <h4 className="card-title">Sign In</h4>
                <p className="card-text">Sign in with your Google account</p>
                {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  <button className="btn btn-light" onClick={handleSignIn}>
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
