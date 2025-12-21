import { useState } from "react";
import ReactMarkdown from "react-markdown";

const App = () => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <div>
        <h1>Markdown</h1>
        <textarea value={text} onChange={handleChange} />
        <section>
          <ReactMarkdown>{text}</ReactMarkdown>
        </section>
      </div>
    </>
  );
};

export default App;
