import React from "react";

function Post({ postID, username, postText, timestamp }) {
  return (
    <div className="post">
      <p className="postID">{postID}</p>
      <p className="username">{username}</p>
      <p className="postText">{postText}</p>
      <p className="timestamp">{timestamp}</p>
    </div>
  );
}

export default Post;
