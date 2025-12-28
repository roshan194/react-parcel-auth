import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupSuccess } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    const accessToken = Math.random().toString(36).substring(2);

    localStorage.setItem("user", JSON.stringify(formData));
    localStorage.setItem("token", accessToken);

    dispatch(signupSuccess({ user: formData, token: accessToken }));

    setSuccess("Signup successful!");
    setError("");

    setTimeout(() => navigate("/profile"), 1000);
  };

  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h2>Signup</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <br /><br />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <br /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <br /><br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
