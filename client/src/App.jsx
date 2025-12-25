import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import documentService from "./services/documents";
import Sidebar from "./components/Sidebar";
import menu from "./assets/icon-menu.svg";

const App = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
        setDocuments((docs) => docs.concat(newDoc));
        setSelectedDocument(newDoc);
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
      .then((docs) => setDocuments(docs))
      .catch((error) => {
        console.error("Error fetching documents", error);
        alert("Failed to load documents");
      });
  }, []);

  return (
    <>
      <div className="app">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          handleCreate={handleCreate}
          documents={documents}
          setSelectedDocument={setSelectedDocument}
        />
        <main className="main">
          <header>
            <div>
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <img src={menu} alt="Open menu" />
              </button>
              <button onClick={() => handleDelete(selectedDocument.id)}>
                Delete
              </button>
              <button
                disabled={!selectedDocument}
                onClick={() => handleSave(selectedDocument.id)}
              >
                Save document
              </button>
            </div>
          </header>
          <div>
            <textarea
              className="main__markdown-window"
              value={selectedDocument ? selectedDocument.content : ""}
              onChange={handleChange}
            />
            <section className="main__preview-window">
              <ReactMarkdown>
                {selectedDocument ? selectedDocument.content : ""}
              </ReactMarkdown>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
