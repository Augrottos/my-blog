import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser, authFetch } from "../utils";

const API_BASE = "/api";

function StudyNotesPage() {
  const [notes, setNotes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const loadNotes = () => {
    authFetch(`${API_BASE}/notes`)
      .then((res) => res.json())
      .then((res) => setNotes(res.data || []))
      .catch(console.error);
  };

  useEffect(() => {
    loadNotes();
    getCurrentUser().then((res) => {
      if (res.data?.role === "admin") setIsAdmin(true);
    });
  }, []);

  const handleDelete = async (noteId) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await authFetch(`${API_BASE}/admin/notes/${noteId}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Delete failed:", err);
    }
    loadNotes();
  };

  const handlePin = async (noteId) => {
    try {
      const res = await authFetch(`${API_BASE}/admin/notes/${noteId}/pin`, {
        method: "PUT",
      });
      if (res.ok) {
        loadNotes();
      } else {
        const err = await res.json().catch(() => ({}));
        console.error("Pin failed:", err);
      }
    } catch (err) {
      console.error("Pin error:", err);
    }
  };

  return (
    <section className="section has-navbar-fixed-top">
      <style>
        {`
        @media (max-width: 1023px) {
          .archives-columns {
            column-count: 1 !important;
          }
        }
      `}
      </style>
      <div className="container">
        <div className="level">
          <div className="level-left">
            <h1 className="title is-3">Study Notes</h1>
          </div>
          {isAdmin && (
            <div className="level-right">
              <Link to="/study-notes/new" className="button is-dark">
                New Note
              </Link>
            </div>
          )}
        </div>

        <div className="archives-columns">
          {notes.map((note) => (
            <div key={note.id} className="card-item">
              <div className="card" style={{ position: "relative" }}>
                <div className="card-content">
                  <p className="title is-5">
                    <Link to={`/study-notes/${note.id}`}>{note.title}</Link>
                  </p>
                  <p className="has-text-grey is-size-7 mb-3">{note.summary}</p>
                  <p className="is-size-7 has-text-grey-light">
                    {note.updated_at}
                  </p>
                </div>
                {note.is_pinned && (
                  <span
                    title="Pinned"
                    style={{
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      right: "1rem",
                      color: "#b0b0b0",
                      opacity: 0.5,
                    }}
                  >
                    <i className="fas fa-thumbtack"></i>
                  </span>
                )}
                {isAdmin && (
                  <footer className="card-footer">
                    <Link
                      to={`/study-notes/${note.id}/edit`}
                      className="card-footer-item"
                    >
                      Edit
                    </Link>
                    <a
                      className="card-footer-item"
                      onClick={() => handlePin(note.id)}
                    >
                      {note.is_pinned ? "Unpin" : "Pin"}
                    </a>
                    <a
                      className="card-footer-item has-text-danger"
                      onClick={() => handleDelete(note.id)}
                    >
                      Delete
                    </a>
                  </footer>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StudyNotesPage;
