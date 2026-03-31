const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON payloads
app.use(express.json());

// Your Discord webhook URL (create one in a channel)
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK; 

app.post('/hatch', async (req, res) => {
  const { user, item } = req.body; // Example payload

  if (!user || !item) {
    return res.status(400).send('Missing user or item in payload');
  }

  try {
    await axios.post(DISCORD_WEBHOOK, {
      content: `🚨 **Hatch Alert!** ${user} just hatched a **${item}**!`
    });
    res.send('Ping sent!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to send ping');
  }
});

app.get('/', (req, res) => {
  res.send('Hatched-logs service is online!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
