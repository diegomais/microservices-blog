import { FormEvent, useState } from 'react';

type Props = {
  postId: string;
};

const CommentCreate = ({ postId }: Props) => {
  const [content, setContent] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch(`http://localhost:4002/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    setContent('');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>New Comment</label>
        <input
          className="form-control"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </div>
      <button className="btn btn-primary mt-3">Submit</button>
    </form>
  );
};

export default CommentCreate;
