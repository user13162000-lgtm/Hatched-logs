const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;

app.get('/', (req, res) => {
  res.send('Hatched logs service is running!');
});

app.post('/hatch', async (req, res) => {
  const { user, item } = req.body;

  if (!user || !item) {
    return res.status(400).send('Missing user or item in payload');
  }

  try {
    await axios.post(DISCORD_WEBHOOK, {
      content: `🚨 **Hatch Alert!** ${user} just hatched a **${item}**!`
    });
    res.send('Ping sent!');
  } catch (err) {
    res.status(500).send('Failed to send ping');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
