import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import documentService from "./services/documents";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import showPreviewIcon from "./assets/icon-show-preview.svg";
import hidePreviewIcon from "./assets/icon-hide-preview.svg";
import "./App.css";

const App = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleChange = (e) => {
    if (!selectedDocument) return;
    setSelectedDocument({ ...selectedDocument, content: e.target.value });
  };

  const handleSave = (id) => {
    documentService
      .update(id, selectedDocument)
      .then((updatedDoc) => {
        setDocuments((docs) =>
          docs.map((doc) => (doc.id === id ? updatedDoc : doc))
        );
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
        setDocuments((docs) => [newDoc, ...docs]);
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

  useEffect(() => {
    documentService
      .getAll()
      .then((docs) => {
        setDocuments(docs);
        if (docs.length > 0) {
          setSelectedDocument(docs[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching documents", error);
        alert("Failed to load documents");
      });
  }, []);

  return (
    <div className="app">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleCreate={handleCreate}
        documents={documents}
        setSelectedDocument={setSelectedDocument}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="main">
        <Header
          handleDelete={handleDelete}
          handleSave={handleSave}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          selectedDocument={selectedDocument}
        />
        <div className="main__window-header">
          <span className="heading-s" aria-live="polite">
            {isEditorOpen ? "MARKDOWN" : "PREVIEW"}
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
