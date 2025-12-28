import Avatar from "./Avatar";
import "../pages/ProfilePage.css";

export default function ProfileCard({
  user,
  showSettings,
  setShowSettings,
  activeSetting,
  setActiveSetting,
  username,
  setUsername,
  bio,
  setBio,
  saveProfile,
  uploadAvatar,
}) {
  return (
    <div className="profile-card">

      {/* VIEW MODE */}
      {!showSettings && (
        <>
          <div className="profile-header">
            <Avatar username={user.username} avatar={user.avatar} />
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

      {/* SETTINGS MODE */}
      {showSettings && (
        <>
          <h3 className="settings-title">Profile Settings</h3>

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
                Close
              </button>
            </div>
          )}

          {activeSetting === "avatar" && (
            <>
              <input type="file" accept="image/*" onChange={uploadAvatar} />
              <button
                className="profile-cancel"
                onClick={() => setActiveSetting(null)}
              >
                Back
              </button>
            </>
          )}

          {activeSetting === "username" && (
            <>
              <input
                className="profile-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button className="profile-save" onClick={saveProfile}>
                Save
              </button>
            </>
          )}

          {activeSetting === "bio" && (
            <>
              <textarea
                className="profile-bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <button className="profile-save" onClick={saveProfile}>
                Save
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
