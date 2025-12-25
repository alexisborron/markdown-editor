import menuIcon from "../../assets/icon-menu.svg";
import deleteIcon from "../../assets/icon-delete.svg";
import saveIcon from "../../assets/icon-save.svg";
import closeIcon from "../../assets/icon-close.svg";

import "./header.css";

const Header = ({
  handleDelete,
  handleSave,
  isSidebarOpen,
  setIsSidebarOpen,
  selectedDocument
}) => {
  return (
    <header className="main__header">
      <button
        className="main__menu-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
      >
        <img
          src={isSidebarOpen ? closeIcon : menuIcon}
          alt={isSidebarOpen ? "Close menu" : "Open menu"}
        />
      </button>
      <div className="main__header-actions">
        <button
          className="main__delete-btn"
          onClick={() => handleDelete(selectedDocument.id)}
          disabled={!selectedDocument}
          aria-label="Delete document"
        >
          <img src={deleteIcon} alt="Delete document" />
        </button>
        <button
          className="main__save-btn"
          disabled={!selectedDocument}
          onClick={() => handleSave(selectedDocument.id)}
          aria-label="Save document"
        >
          <img src={saveIcon} alt="Save document" />
        </button>
      </div>
    </header>
  );
};

export default Header;
