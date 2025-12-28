import logo from "../../assets/logo.svg";
import { formatDate } from "../../utilities/formatDate";
import "./sidebar.css";

const Sidebar = ({
  isSidebarOpen,
  handleCreate,
  documents,
  selectedDocument,
  setSelectedDocument,
  isDarkMode,
  handleToggle,
  titleEditor
}) => {
  const {
    isEditingTitle,
    editedTitle,
    setEditedTitle,
    saveEdit,
    startEdit,
    cancelEdit,
    editLocation
  } = titleEditor;

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
              {isEditingTitle &&
              editLocation === "sidebar" &&
              selectedDocument?.id === doc.id ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onBlur={() => saveEdit(editedTitle)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(editedTitle);
                    if (e.key === "Escape") cancelEdit();
                  }}
                  onFocus={(e) => e.target.select()}
                  autoFocus
                  className="heading-m"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <span
                  className="heading-m"
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    startEdit("sidebar");
                  }}
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
