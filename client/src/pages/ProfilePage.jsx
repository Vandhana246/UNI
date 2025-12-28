import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Avatar from "../components/Avatar";
import { getProfile, updateProfile } from "../api/profile";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  // controls which setting is active
  const [activeSetting, setActiveSetting] = useState(null);
  // "avatar" | "username" | "bio"

  useEffect(() => {
    getProfile().then((res) => {
      setUser(res.data);
      setUsername(res.data.username);
      setBio(res.data.bio || "");
    });
  }, []);

  if (!user) return null;

  const saveProfile = async () => {
    const res = await updateProfile({ username, bio });
    setUser(res.data);
    window.dispatchEvent(new Event("profile-updated"));

    setActiveSetting(null);
    setShowSettings(false);
  };

  const uploadAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const res = await updateProfile({ avatar: reader.result });
      setUser(res.data);
      window.dispatchEvent(new Event("profile-updated"));

      setActiveSetting(null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div className="profile-wrapper">
        <div className="profile-card">

          {/* ================= VIEW MODE ================= */}
          {!showSettings && (
            <>
              <div className="profile-header">
                <Avatar
                  username={user.username}
                  avatar={user.avatar}
                />
                <h2 className="profile-username">@{user.username}</h2>
                <p className="profile-email">{user.email}</p>
              </div>

              <div className="profile-section">
                <h4 className="profile-section-title">Bio</h4>
                <p className="profile-bio-text">
                  {user.bio || "No bio added yet."}
                </p>
              </div>

              <button
  className="profile-settings-pill"
  onClick={() => setShowSettings(true)}
>
  ⚙ Settings
</button>


            </>
          )}

          {/* ================= SETTINGS MODE ================= */}
          {showSettings && (
            <>
              <h3 className="settings-title">Profile Settings</h3>

              {/* SETTINGS ACTION BUTTONS */}
              {!activeSetting && (
                <div className="settings-actions">
                  <button
                    className="settings-pill"
                    onClick={() => setActiveSetting("avatar")}
                  >
                    Change Avatar
                  </button>

                  <button
                    className="settings-pill"
                    onClick={() => setActiveSetting("username")}
                  >
                    Edit Username
                  </button>

                  <button
                    className="settings-pill"
                    onClick={() => setActiveSetting("bio")}
                  >
                    Edit Bio
                  </button>

                  <button
                    className="settings-pill danger"
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </button>

                  <button
                    className="settings-pill subtle"
                    onClick={() => setShowSettings(false)}
                  >
                    Close Settings
                  </button>
                </div>
              )}

              {/* CHANGE AVATAR */}
              {activeSetting === "avatar" && (
                <>
                  <div className="settings-group">
                    <label className="settings-label">
                      Upload New Avatar
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={uploadAvatar}
                      className="settings-file"
                    />
                  </div>

                  <button
                    className="profile-cancel"
                    onClick={() => setActiveSetting(null)}
                  >
                    Back
                  </button>
                </>
              )}

              {/* EDIT USERNAME */}
              {activeSetting === "username" && (
                <>
                  <div className="settings-group">
                    <label className="settings-label">
                      New Username
                    </label>
                    <input
                      className="profile-input"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <button
                    className="profile-save"
                    onClick={saveProfile}
                  >
                    Save
                  </button>

                  <button
                    className="profile-cancel"
                    onClick={() => setActiveSetting(null)}
                  >
                    Back
                  </button>
                </>
              )}

              {/* EDIT BIO */}
              {activeSetting === "bio" && (
                <>
                  <div className="settings-group">
                    <label className="settings-label">
                      Bio
                    </label>
                    <textarea
                      className="profile-bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>

                  <button
                    className="profile-save"
                    onClick={saveProfile}
                  >
                    Save
                  </button>

                  <button
                    className="profile-cancel"
                    onClick={() => setActiveSetting(null)}
                  >
                    Back
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
