import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import PostList from "./PostList";

export default function HomePage() {
  const [nextURL, setNextURL] = useState("/api/posts_0.json");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = "All Posts - @tarptaeya";
  }, []);

  useEffect(() => {
    (async () => {
      const resp = await axios.get(nextURL);
      const newPosts = resp?.data?.posts ?? [];
      setPosts([...posts, ...newPosts]);

      if (resp?.data?.next) {
        setNextURL(resp?.data?.next);
      }
    })();
  }, [nextURL]);

  return (
    <div className="page">
      <div className="main-container">
        <div className="all-posts-page-container">
          <h3>All Posts</h3>
          <PostList posts={posts} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
