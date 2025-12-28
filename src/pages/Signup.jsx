import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupSuccess } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/auth.css";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (token) navigate("/profile");
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Error : All the fields are mandatory");
      setSuccess("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    const token = Math.random().toString(36).substring(2);

    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    localStorage.setItem("token", token);

    dispatch(signupSuccess({ user: { name, email, password }, token }));

    setError("");
    setSuccess("Successfully Signed Up!");

    setTimeout(() => navigate("/profile"), 1000);
  };

  return (
    <>
      <Header />

      <div className="page">
        <h1>Signup</h1>

        <form className="form" onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <button className="btn">Signup</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
