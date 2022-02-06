import { useState, useEffect } from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

type Post = {
  id: string;
  title: string;
};

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('http://localhost:4001/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {posts.map((post) => {
        return (
          <div
            className="card"
            style={{ width: '30%', marginBottom: '20px' }}
            key={post.id}
          >
            <div className="card-body">
              <h3>{post.title}</h3>
              <CommentList postId={post.id} />
              <CommentCreate postId={post.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
