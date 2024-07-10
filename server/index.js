const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

app.get('/api/userinfo', async (req, res) => {
  let accessToken = req.query.access_token;
  console.log(`Original Access Token: "${accessToken}"`);

  // Sanitize the access token
  accessToken = accessToken.trim();
  console.log(`Sanitized Access Token: "${accessToken}"`);

  try {
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`, 
      },
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching user info:", error.message);
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // No response received
      console.error("Request:", error.request);
    } else {
      // Error setting up the request
      console.error("Message:", error.message);
    }
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
