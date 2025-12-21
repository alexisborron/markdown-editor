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

  useEffect(() => {
    axios.get(baseUrl).then((response) => setDocuments(response.data));
  }, []);

  return (
    <>
      <div>
        <h1>Markdown</h1>
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
            <li key={doc.id}>{doc.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
