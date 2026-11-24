
import React, { useState } from "react";
import axios from "axios";

function NewNotice({ onAddNotice }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    } catch (error) {
      console.error("Error posting notice:", error);
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
    </div>
  );
}

export default NewNotice;
