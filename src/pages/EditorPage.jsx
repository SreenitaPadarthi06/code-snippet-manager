import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

function EditorPage() {

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState("");
  const [code, setCode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [snippets, setSnippets] = useState([]);

  // Load snippets from localStorage
  useEffect(() => {
    const storedSnippets = localStorage.getItem("code_snippets_data");
    if (storedSnippets) {
      setSnippets(JSON.parse(storedSnippets));
    }
  }, []);

  // Load snippet into editor
  const handleLoadSnippet = (snippet) => {
    setTitle(snippet.title);
    setLanguage(snippet.language);
    setTags(snippet.tags.join(","));
    setCode(snippet.content);
  };

  // Save snippet
  const handleSaveSnippet = () => {

    if (!title || !language || !code) {
      alert("Please fill Title, Language and Code");
      return;
    }

    const newSnippet = {
      id: Date.now(),
      title: title,
      language: language,
      tags: tags.split(","),
      content: code
    };

    const updatedSnippets = [...snippets, newSnippet];

    setSnippets(updatedSnippets);

    localStorage.setItem(
      "code_snippets_data",
      JSON.stringify(updatedSnippets)
    );

    // clear fields
    setTitle("");
    setLanguage("");
    setTags("");
    setCode("");
  };

  // Delete snippet
  const handleDeleteSnippet = (id) => {
    const updatedSnippets = snippets.filter((snippet) => snippet.id !== id);
    setSnippets(updatedSnippets);

    localStorage.setItem(
      "code_snippets_data",
      JSON.stringify(updatedSnippets)
    );
  };

  return (
    <div>

      <h2>Editor Page</h2>

      <button data-testid="create-snippet-button">
        Create Snippet
      </button>

      <div>

        <input
          data-testid="snippet-title-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          data-testid="snippet-language-input"
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />

        <input
          data-testid="snippet-tags-input"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button
          data-testid="save-snippet-button"
          onClick={handleSaveSnippet}
        >
          Save Snippet
        </button>

      </div>

      {/* Monaco Editor */}
      <div
        data-testid="monaco-editor-container"
        style={{ height: "400px", marginTop: "20px" }}
      >
        <Editor
          height="100%"
          language={language || "javascript"}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
        />
      </div>

      {/* Search */}
      <input
        data-testid="search-input"
        placeholder="Search snippets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Saved snippets */}
      <h3>Saved Snippets</h3>

      <ul data-testid="snippet-list">
        {snippets
          .filter(
            (snippet) =>
              snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              snippet.content.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((snippet) => (
            <li key={snippet.id} style={{ marginBottom: "10px" }}>

              <button
                onClick={() => handleLoadSnippet(snippet)}
              >
                {snippet.title} - {snippet.language}
              </button>

              <button
                style={{ marginLeft: "10px" }}
                onClick={() => handleDeleteSnippet(snippet.id)}
              >
                Delete
              </button>

            </li>
          ))}
      </ul>

    </div>
  );
}

export default EditorPage;