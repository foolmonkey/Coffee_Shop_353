import React from "react";
import Post from "./Post";

function PostList({ data }) {
  return (
    <section id="posts">
      {data.map((item, i) => {
        return (
          <Post
            key={i}
            postID={item.postID}
            username={item.username}
            postText={item.text}
            timestamp={new Date(Date.parse(item.timestamp)).toLocaleString()}
          ></Post>
        );
      })}
    </section>
  );
}

export default PostList;
