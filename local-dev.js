const express = require('express');
const path = require('path');
const cors = require('cors');

// Import our API route handlers
const chatHandler = require('./api/chat.js');
const psychoanalyzeHandler = require('./api/psychoanalyze.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mount the API handlers
app.post('/api/chat', chatHandler);
app.post('/api/psychoanalyze', psychoanalyzeHandler);

// Serve static files for local development
app.use(express.static(path.join(__dirname, '.')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[LOCAL DEV] Qwen Chaos Server is running on http://localhost:${PORT}`);
});
