/* import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

 /* const submit = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "test-token");
    navigate("/feed");
  }; 

  const submit = async (e) => {
    e.preventDefault();
    console.log("LOGIN INPUT DOB:", dob, typeof dob);

    try {
      const data = await loginUser({ email, dob });
      localStorage.setItem("token", data.token);
      
      navigate("/feed");
    } catch (err) {
      alert("Invalid email or DOB");
    }
  };

  return (
    <form onSubmit={submit} className="login-card">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="College Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="DOB (DDMMYYYY)"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}
*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const data = await loginUser({ email, dob });
    localStorage.setItem("token", data.token);
    navigate("/feed");
  };

  return (
    <form className="glass-card" onSubmit={submit}>
  <h2>LOGIN</h2>

  <input
    type="email"
    placeholder="College Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />

  <input
    type="password"
    placeholder="DOB (DDMMYYYY)"
    value={dob}
    onChange={(e) => setDob(e.target.value)}
    required
  />

  <button type="submit">LOGIN</button>
</form>


  );
}
