const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "JARVIS backend is online, Boss!"
  });
});

app.post("/chat", (req, res) => {
  const message = req.body.message || "";

  res.json({
    reply: `JARVIS received: ${message}`
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`JARVIS server running on port ${PORT}`);
});
