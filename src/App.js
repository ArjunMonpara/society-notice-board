
import React, { useState, useEffect } from "react";
import axios from "axios";

import NoticeList from "./NoticeList";
import NewNotice from "./NewNotice";
import "./App.css";

function App() {
  const [notices, setNotices] = useState([]);
  const [block, setBlock] = useState("1");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _limit: 8,
              userId: block
            }
          }
        );

        setNotices(response.data);
      } catch (error) {
        if (error.response) {
          setErrorMessage(
            `Server problem (code ${error.response.status})`
          );
        } else {
          setErrorMessage("No internet connection");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [block, retryCount]);

  const handleAddNotice = (newNotice) => {
    setNotices((prevNotices) => [
      newNotice,
      ...prevNotices
    ]);

    setMessage(`Notice posted, id ${newNotice.id}`);
  };

  const handleRetry = () => {
    setRetryCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="app">
      <h1>Society Notice Board</h1>

      <NewNotice onAddNotice={handleAddNotice} />

      <hr />

      <h2>Society Notices</h2>

      <label>Select Block: </label>

      <select
        value={block}
        onChange={(event) => {
          setBlock(event.target.value);
          setMessage("");
        }}
      >
        <option value="1">Block A</option>
        <option value="2">Block B</option>
        <option value="3">Block C</option>
      </select>

      <h3>Showing {notices.length} notices</h3>

      {message && (
        <p style={{ color: "green" }}>{message}</p>
      )}

      {loading ? (
        <p>Loading notices...</p>
      ) : errorMessage ? (
        <div
          style={{
            color: "red",
            border: "1px solid red",
            padding: "10px",
            marginTop: "15px"
          }}
        >
          <p>{errorMessage}</p>

          <button onClick={handleRetry}>
            Try again
          </button>
        </div>
      ) : (
        <NoticeList notices={notices} />
      )}
    </div>
  );
}

export default App;
