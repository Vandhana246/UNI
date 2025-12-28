import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiHome, FiUser, FiLogOut } from "react-icons/fi";
import axios from "axios";
import "../styles/sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  const fetchProfile = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/profile/me", {
        headers: { Authorization: token },
      })
      .then((res) => setUser(res.data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchProfile();
    window.addEventListener("profile-updated", fetchProfile);
    return () =>
      window.removeEventListener("profile-updated", fetchProfile);
  }, []);

  return (
    <aside className="sidebar">
      {/* PROFILE SNAPSHOT */}
      <div
        className="sidebar-profile clickable"
        onClick={() => setOpenProfile(!openProfile)}
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            className="sidebar-avatar-img"
          />
        ) : (
          <div className="sidebar-avatar">
            {user?.username?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}

        <div className="sidebar-userinfo">
          <span className="sidebar-username">
            @{user?.username || "user"}
          </span>
          <span className="sidebar-email">
            {user?.email || ""}
          </span>
        </div>
      </div>

      {/* INLINE PROFILE CARD */}
      {openProfile && (
        <div className="sidebar-profile-card">
          <p className="sidebar-bio">
            {user?.bio || "No bio added"}
          </p>

          <Link to="/profile" className="sidebar-profile-link">
            Open Full Profile
          </Link>
        </div>
      )}

      {/* NAV */}
      <nav className="sidebar-nav">
        <Link
          to="/feed"
          className={location.pathname === "/feed" ? "active" : ""}
        >
          <FiHome className="sidebar-icon" />
          <span>Feed</span>
        </Link>

        <Link
          to="/profile"
          className={location.pathname === "/profile" ? "active" : ""}
        >
          <FiUser className="sidebar-icon" />
          <span>Profile</span>
        </Link>
      </nav>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <button
          className="sidebar-logout"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          <FiLogOut className="sidebar-icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
