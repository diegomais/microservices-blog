const axios = require('axios').default;
const cors = require('cors');
const express = require('express');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.post('/events', async (req, res) => {
  const event = req.body;

  try {
    await axios.post('http://posts:4001/events', event)
    await axios.post('http://comments:4002/events', event)
  } catch (error) {
    console.log(error.message);
  }
  
  res.send({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port ${port}
    📭  Explore at http://localhost:${port}
  `);
});
