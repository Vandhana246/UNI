/*import Login from "../components/Login";
import "../pages/LoginPage.css";

export default function LoginPage() {
  return (
    <div className="login-wrapper">
      <div className="login-left">
        <h1>UNI</h1>
        <p>College Community Platform</p>
      </div>

      <div className="login-right">
        <Login />
      </div>
    </div>
  );
}
*/
import Login from "../components/Login";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="glass-bg">
      <div className="glass-container">
        {/* LEFT INFO PANEL */}
        <div className="glass-info">
          <h1>UNI</h1>
          <h2>College Network</h2>
          <p>
          A private platform for college students to connect,
    share posts, and collaborate securely.
          </p>
         
          <span className="glass-footer">
            © UNI College Network
          </span>
        </div>

        {/* RIGHT LOGIN PANEL */}
        <Login />
      </div>
    </div>
  );
}

