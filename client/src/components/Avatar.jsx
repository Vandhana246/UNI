export default function Avatar({ username, avatar }) {
    const letter = username?.[0]?.toUpperCase() || "U";
  
    return avatar ? (
      <img
        src={avatar}
        alt="avatar"
        className="profile-avatar-img"
      />
    ) : (
      <div className="profile-avatar-fallback">
        {letter}
      </div>
    );
  }
  