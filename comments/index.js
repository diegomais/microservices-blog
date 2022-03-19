const axios = require('axios').default;
const cors = require('cors');
const { randomBytes } = require('crypto');
const express = require('express');

const app = express();
const port = 4002;
const commentsByPostId = {};

app.use(cors());
app.use(express.json());

app.get('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  res.send(commentsByPostId[postId] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const postId = req.params.id;
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[postId] || [];
  const comment = { id: commentId, content };
  comments.push(comment);
  commentsByPostId[postId] = comments;

  try {
    await axios.post('http://event-bus:4000/events', {
      type: 'CommentCreated',
      payload: { ...comment, postId },
    });
  } catch (error) {
    console.log(error.message);
  }

  res.status(201).send(comment);
});

app.post('/events', async (req, res) => {
  console.log('Received event: ', req.body.type);
  res.send({});
})

app.listen(port, () => {
  console.log(`
     🚀  Server is running!
     🔉  Listening on port ${port}
     📭  Explore at http://localhost:${port}
   `);
});
