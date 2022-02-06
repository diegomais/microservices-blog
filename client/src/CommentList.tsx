import { useState, useEffect } from 'react';

type Comment = {
  id: string;
  content: string;
};

type Props = {
  postId: string;
};

const CommentList = ({ postId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch(`http://localhost:4002/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, [postId]);

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

export default CommentList;
