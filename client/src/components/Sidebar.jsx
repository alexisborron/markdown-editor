import logo from "../assets/logo.svg";
import { formatDate } from "../utilities/formatDate";
import "./sidebar.css";

const Sidebar = ({
  isSidebarOpen,
  handleCreate,
  documents,
  setSelectedDocument
}) => {
  return (
    <aside className={`sidebar ${isSidebarOpen ? "sidebar--open" : ""}`}>
      <header className="sidebar__header">
        <img className="sidebar__logo" src={logo} alt="Markdown Logo" />
        <h1 className="heading-s">My Documents</h1>
      </header>

      <button className="sidebar__new-btn heading-m" onClick={handleCreate}>
        + New Document
      </button>

      <ul className="sidebar__doc-list">
        {documents.map((doc) => (
          <li
            className="sidebar__doc-list-item"
            key={doc.id}
            onClick={() => setSelectedDocument(doc)}
          >
            <div className="sidebar__doc-list-item-details">
              <span className="sidebar__doc-list-item-date">
                {formatDate(doc.updatedAt)}
              </span>
              <span className="heading-m">{doc.title}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="sidebar__toggle">Toggle will go here</div>
    </aside>
  );
};

export default Sidebar;
