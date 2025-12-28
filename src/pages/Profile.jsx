import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/auth.css";

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <Header />

      <div className="page">
        <h1>Profile</h1>

        {user && (
          <div className="profile-info">
            <p><span>Full Name :</span> {user.name}</p>
            <p><span>Email :</span> {user.email}</p>
            <p><span>Password :</span> {user.password}</p>
          </div>
        )}

        <button className="btn" onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Profile;
