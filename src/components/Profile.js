import React, { useEffect, useState } from "react";

import { auth } from "../firebase/firebase"; // Replace with your authentication context

function ProfilePage() {
  // Replace with your authentication context
  const [profilePicture, setProfilePicture] = useState(null);

  // Load the user's profile picture
  useEffect(() => {
    if (auth.currentUser) {
      setProfilePicture(auth.currentUser.photoURL);
    }
  }, [auth.currentUser]);

  return (
    <div
      className="container-fluid "
      style={{
        background:
          "linear-gradient(rgba(0,0,0,0),rgba(0,0,0,255)),url(https://wallpaperaccess.com/full/7046.jpg)",
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card  shadow">
              <div className="display-1">Welcome,</div>
              <div className="card-body text-center">
                <h1>{auth?.currentUser?.displayName}</h1>
                <h2 className="card-title">
                  {auth.currentUser
                    ? auth.currentUser.email
                    : "You are not logged in ..."}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
