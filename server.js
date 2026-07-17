const express = require('express');
const path = require('path');
const apiApp = require('./api/index.js'); // Import our API routes

const app = express();
const PORT = process.env.PORT || 3000;

// Mount the API app (it already handles /api/chat etc)
app.use(apiApp);

// Serve static files for local development
app.use(express.static(path.join(__dirname, '.')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[LOCAL DEV] Qwen Chaos Server is running on http://localhost:${PORT}`);
});
