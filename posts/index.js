const cors = require('cors');
const { randomBytes } = require('crypto');
const express = require('express');

const app = express();
const port = 4001;
const posts = {};

app.use(express.json());
app.use(cors());

app.get('/posts', (req, res) => {
  res.send(Object.values(posts));
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  const post = { id, title };
  posts[id] = post;
  res.status(201).send(post);
});

app.listen(port, () => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port ${port}
    📭  Explore at http://localhost:${port}
  `);
});