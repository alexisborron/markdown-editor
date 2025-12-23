import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
const baseUrl = "http://localhost:3001/api/documents";

const App = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleChange = (e) => {
    setSelectedDocument({ ...selectedDocument, content: e.target.value });
  };

  const handleSave = (id) => {
    const url = `${baseUrl}/${id}`;
    axios.put(url, selectedDocument).then((response) => {
      setDocuments(
        documents.map((doc) => (doc.id === id ? response.data : doc))
      );
    });
  };

  useEffect(() => {
    axios.get(baseUrl).then((response) => setDocuments(response.data));
  }, []);

  return (
    <>
      <div>
        <h1>Markdown</h1>
        <button
          disabled={!selectedDocument}
          onClick={() => handleSave(selectedDocument.id)}
        >
          Save document
        </button>
        <textarea
          value={selectedDocument ? selectedDocument.content : ""}
          onChange={handleChange}
        />
        <section>
          <ReactMarkdown>
            {selectedDocument ? selectedDocument.content : ""}
          </ReactMarkdown>
        </section>
        <ul>
          {documents.map((doc) => (
            <li key={doc.id} onClick={() => setSelectedDocument(doc)}>
              {doc.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
