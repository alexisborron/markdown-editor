import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import documentService from "./services/documents";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import useTitleEditor from "./hooks/useTitleEditor";
import showPreviewIcon from "./assets/icon-show-preview.svg";
import hidePreviewIcon from "./assets/icon-hide-preview.svg";
import "./App.css";

const App = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const titleEditor = useTitleEditor(
    selectedDocument,
    setSelectedDocument,
    documentService,
    setDocuments
  );

  const handleChange = (e) => {
    if (!selectedDocument) return;
    setSelectedDocument({ ...selectedDocument, content: e.target.value });
  };

  const handleSave = (id) => {
    documentService
      .update(id, selectedDocument)
      .then((updatedDoc) => {
        setDocuments((docs) => {
          const updated = docs.map((doc) => (doc.id === id ? updatedDoc : doc));
          return updated.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
        });
      })
      .catch((error) => {
        console.error("Error saving document", error);
        alert("Failed to save document");
      });
  };

  const handleCreate = () => {
    documentService
      .create({})
      .then((newDoc) => {
        setDocuments((docs) => {
          const updated = [newDoc, ...docs];
          return updated.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
        });
        setSelectedDocument(newDoc);
        setIsEditorOpen(true);
      })
      .catch((error) => {
        console.error("Error creating document", error);
        alert("Failed to create document");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this document?")) {
      documentService
        .remove(id)
        .then(() => {
          setDocuments((docs) => docs.filter((doc) => doc.id !== id));
          if (selectedDocument?.id === id) {
            setSelectedDocument(null);
          }
        })
        .catch((error) => {
          if (error.response?.status === 404) {
            setDocuments((docs) => docs.filter((doc) => doc.id !== id));
          } else {
            alert("Failed to delete document");
          }
        });
    }
  };

  const handleToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    documentService
      .getAll()
      .then((docs) => {
        const sortedDocs = docs.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setDocuments(sortedDocs);
        if (sortedDocs.length > 0) {
          setSelectedDocument(sortedDocs[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching documents", error);
        alert("Failed to load documents");
      });
  }, []);

  return (
    <div className={`${isDarkMode ? "dark" : "light"} app`}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleCreate={handleCreate}
        documents={documents}
        setSelectedDocument={setSelectedDocument}
        selectedDocument={selectedDocument}
        handleToggle={handleToggle}
        isDarkMode={isDarkMode}
        titleEditor={titleEditor}
      />
      <main className="main">
        <Header
          handleDelete={handleDelete}
          handleSave={handleSave}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          selectedDocument={selectedDocument}
          titleEditor={titleEditor}
        />
        <div className="main__window-header">
          <span className="heading-s" aria-live="polite">
            {isEditorOpen ? "Markdown" : "Preview"}
          </span>
          <button
            onClick={() => setIsEditorOpen(!isEditorOpen)}
            aria-label={isEditorOpen ? "Show preview" : "Show editor"}
          >
            <img
              src={isEditorOpen ? showPreviewIcon : hidePreviewIcon}
              alt={isEditorOpen ? "Click to preview" : "Click to edit"}
            />
          </button>
        </div>
        {isEditorOpen ? (
          <textarea
            className="main__markdown-window"
            value={selectedDocument ? selectedDocument.content : ""}
            onChange={handleChange}
            placeholder="Start writing your markdown..."
            disabled={!selectedDocument}
          />
        ) : (
          <section className="main__preview-window">
            <ReactMarkdown>
              {selectedDocument ? selectedDocument.content : ""}
            </ReactMarkdown>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
