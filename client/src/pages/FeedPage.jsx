import Sidebar from "../components/Sidebar";
import "./FeedPage.css";

export default function FeedPage() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <main className="feed-wrapper">
        {/* HEADER */}
        <div className="feed-header">
          <h2>Feed</h2>

          <button
            className="feed-logout"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>

        {/* FEED CONTENT */}
        <div className="feed-content">
          <p className="feed-empty">
            No posts yet. Start the conversation 🚀
          </p>
        </div>
      </main>
    </div>
  );
}
