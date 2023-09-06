import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import "./navbar.css"; // Import the CSS file

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        {!user ? (
          <Link to="/login" className="navbar-link">
            Login
          </Link>
        ) : (
          <Link to="/createpost" className="navbar-link">
            Create Post
          </Link>
        )}
      </div>

      {user && (
        <div className="user-info">
          <p className="user-name">{user.displayName}</p>
          <img src={user.photoURL} className="user-avatar" alt="User Avatar" />
          <button className="user-logout-button" onClick={signUserOut}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};
