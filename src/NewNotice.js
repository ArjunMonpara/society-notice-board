
import React, { useState } from "react";
import axios from "axios";

function NewNotice({ onAddNotice }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: title,
          body: body,
          userId: 1
        }
      );

      onAddNotice(response.data);

      setTitle("");
      setBody("");
      setMessage(`Notice posted, id ${response.data.id}`);
    } catch (error) {
      if (error.response) {
        setMessage(
          `Server problem (code ${error.response.status})`
        );
      } else {
        setMessage("No internet connection");
      }
    }
  };

  return (
    <div>
      <h2>New Notice</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            placeholder="Enter notice title"
          />
        </div>

        <br />

        <div>
          <label>Body: </label>

          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
            placeholder="Enter notice details"
          />
        </div>

        <br />

        <button type="submit">Post Notice</button>
      </form>

      {message && (
        <p
          style={{
            color: message.startsWith("Notice posted") ? "green" : "red"
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default NewNotice;
