import { useState } from "react";
import logo from "../../assets/logo.svg";
import { formatDate } from "../../utilities/formatDate";
import "./sidebar.css";

const Sidebar = ({
  isSidebarOpen,
  handleCreate,
  documents,
  selectedDocument,
  setSelectedDocument,
  updateDocumentTitle,
  editingDocId,
  setEditingDocId,
  isDarkMode,
  handleToggle
}) => {
  const [editValue, setEditValue] = useState("");

  const handleDoubleClick = (doc, e) => {
    e.stopPropagation();
    setEditingDocId(doc.id);
    setEditValue(doc.title);
  };

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleKeyDown = (e, doc) => {
    if (e.key === "Enter") {
      handleExit(doc);
    } else if (e.key === "Escape") {
      setEditingDocId(null);
    }
  };

  const handleExit = (doc) => {
    if (editValue.trim()) {
      updateDocumentTitle(doc.id, editValue.trim().replace(/\s+/g, "-"));
    }
    setEditingDocId(null);
    setEditValue("");
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? "sidebar--open" : ""}`}>
      <header className="sidebar__header">
        <img className="sidebar__logo" src={logo} alt="Markdown Logo" />
        <span className="heading-s">My Documents</span>
      </header>

      <button className="sidebar__new-btn heading-m" onClick={handleCreate}>
        + New Document
      </button>

      <ul className="sidebar__doc-list">
        {documents.map((doc) => (
          <li
            className={`sidebar__doc-list-item ${
              selectedDocument?.id === doc.id
                ? "sidebar__doc-list-item--selected"
                : ""
            }`}
            key={doc.id}
            onClick={() => setSelectedDocument(doc)}
          >
            <div className="sidebar__doc-list-item-details">
              <span className="sidebar__doc-list-item-date">
                {formatDate(doc.updatedAt)}
              </span>
              {editingDocId === doc.id ? (
                <input
                  placeholder="untitled-document.md"
                  onKeyDown={(e) => handleKeyDown(e, doc)}
                  onChange={handleChange}
                  value={editValue}
                  onBlur={() => handleExit(doc)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              ) : (
                <span
                  className="heading-m"
                  onDoubleClick={(e) => handleDoubleClick(doc, e)}
                >
                  {doc.title}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
      <label>
        <input type="checkbox" checked={isDarkMode} onChange={handleToggle} />
        Dark Mode
      </label>
    </aside>
  );
};

export default Sidebar;
