const express = require('express');
const axios = require('axios');
const app = express();

require('dotenv').config();
app.use(express.json());
app.use(express.static('public'));

app.post('/send', async (req, res) => {
  const { message } = req.body;

  try {
    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    const send = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message
    });

    res.status(200).json({ status: "sent", telegram: send.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ status: "error", error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("QuantumLionExit active 🚀");
});