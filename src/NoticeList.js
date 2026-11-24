
import React from "react";

function NoticeList({ notices }) {
  return (
    <div>
      {notices.map((notice) => (
        <div className="notice-card" key={notice.id}>
          <h3>{notice.title}</h3>
          <p>{notice.body}</p>
        </div>
      ))}
    </div>
  );
}

export default NoticeList;
