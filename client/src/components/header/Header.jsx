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
  selectedDocument,
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
    <header className="main__header">
      <div className="flex">
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
        {selectedDocument && (
          <div className="main__menu-title">
            {isEditingTitle && editLocation === "header" ? (
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
              />
            ) : (
              <span
                className="heading-m"
                onDoubleClick={() => startEdit("header")}
              >
                {selectedDocument.title}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="main__header-actions">
        <button
          title="Delete document"
          className="main__delete-btn"
          onClick={() => handleDelete(selectedDocument.id)}
          disabled={!selectedDocument}
          aria-label="Delete document"
        >
          <img src={deleteIcon} alt="Delete document" />
        </button>
        <button
          title="Save document"
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
