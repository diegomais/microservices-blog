const axios = require('axios').default;
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

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  const post = { id, title };
  posts[id] = post;

  try {
    await axios.post('http://event-bus:4000/events', {
      type: 'PostCreated',
      payload: post,
    });
  } catch (error) {
    console.log(error.message);
  }

  res.status(201).send(post);
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
