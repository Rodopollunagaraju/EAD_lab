// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1) MOVE KEY TO .env  (rotate if it was exposed)
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

app.use(cors());
app.use(express.json());

// Serve index.html (optional, but convenient if in same folder)
app.use(express.static(__dirname));
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/location', async (req, res) => {
  try {
    // 2) COERCE TO NUMBERS (frontends often send strings)
    const lat = Number(req.body.latitude);
    const lng = Number(req.body.longitude);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return res.status(400).json({ error: 'latitude and longitude must be valid numbers' });
    }
    if (!GOOGLE_MAPS_API_KEY) {
      return res.status(500).json({ error: 'Server missing GOOGLE_MAPS_API_KEY' });
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
    const r = await axios.get(url);
    const data = r.data;

    // 3) LOG DIAGNOSTICS (watch your server console!)
    console.log('[Geocode]', {
      status: data.status,
      results: data.results?.length || 0,
      error_message: data.error_message,
    });

    // 4) HANDLE ALL STATUSES
    if (data.status === 'OK' && data.results && data.results.length > 0) {
      return res.json({ address: data.results[0].formatted_address });
    }

    // Map common failure reasons to clear errors
    const reason =
      data.status === 'ZERO_RESULTS' ? 'No address found at that location (ZERO_RESULTS)' :
      data.status === 'REQUEST_DENIED' ? `Request denied: ${data.error_message || 'check API key restrictions'}` :
      data.status === 'OVER_DAILY_LIMIT' ? 'Quota/billing issue (OVER_DAILY_LIMIT)' :
      data.status === 'INVALID_REQUEST' ? 'Invalid request (check lat/lng)' :
      `Geocoding failed: ${data.status}`;

    return res.status(502).json({ error: reason, status: data.status, details: data.error_message || null });
  } catch (err) {
    console.error('Geocoding error:', err?.response?.data || err.message);
    return res.status(500).json({ error: 'Server error while fetching address' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
