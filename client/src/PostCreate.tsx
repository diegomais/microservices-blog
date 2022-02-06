import { FormEvent, useState } from 'react';

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch('http://localhost:4001/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    setTitle('');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          className="form-control"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <button className="btn btn-primary mt-3">Submit</button>
    </form>
  );
};

export default PostCreate;
