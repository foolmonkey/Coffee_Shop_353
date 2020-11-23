import React, { useState } from "react";
import PostList from "./PostList";
import "./styles.css";

function App() {
  const [getPosts, setPosts] = useState([]);
  const [getUsername, setUsername] = useState("");
  const [getText, setText] = useState("");

  // fetches from api
  async function fetchPosts() {
    await fetch("http://localhost:80/read")
      .then((response) => response.json())
      .then((response) => setPosts(response))
      .catch((err) => console.error(err));
  }

  async function newPost(e) {
    e.preventDefault();

    await fetch("http://localhost:80/create", {
      method: "POST",
      body: `username=${getUsername}&text=${getText}`,
      headers: { "Content-type": "application/x-www-form-urlencoded" },
    })
      .then(fetchPosts())
      .then(function () {
        setUsername("");
        setText("");
      });
  }

  if (getPosts.length < 1) {
    setTimeout(() => {
      fetchPosts();
    }, 500);
  }

  return (
    <div className="App">
      <form onSubmit={newPost}>
        <label htmlFor="username">Username </label>
        <input
          type="text"
          name="username"
          id="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label htmlFor="text">Text </label>
        <textarea
          type="text"
          name="text"
          id="text"
          required
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button type="submit" id="submit" value="post">
          Submit Post
        </button>
      </form>

      <div className="postsHeader">
        <h1>All Posts</h1>
        <button onClick={fetchPosts} className="refresh">
          Refresh
        </button>
      </div>
      <PostList data={getPosts} />
    </div>
  );
}

export default App;
