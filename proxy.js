const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ5NzEyNTI3LCJpYXQiOjE3NDk3MTIyMjcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjMzYWViZTlmLTA4ZTctNGFkNi1iYmJmLTdhOWMzMGI4YmY5NCIsInN1YiI6ImJhbmRpa3J1cGFiaGF2YW5pQGdtYWlsLmNvbSJ9LCJlbWFpbCI6ImJhbmRpa3J1cGFiaGF2YW5pQGdtYWlsLmNvbSIsIm5hbWUiOiJiYW5kaSBrcnVwYSBiaGF2YW5pIiwicm9sbE5vIjoiMjIwM2E1MTgyNSIsImFjY2Vzc0NvZGUiOiJNVkd3RUYiLCJjbGllbnRJRCI6IjMzYWViZTlmLTA4ZTctNGFkNi1iYmJmLTdhOWMzMGI4YmY5NCIsImNsaWVudFNlY3JldCI6Ik5iRHlFalZqdVJqYUR5R2IifQ.WnEUeSI4rg6OUgVR9uYlDtI4k3jcpAtAb-wYsKoUD8g";

const API_MAP = {
  p: 'http://20.244.56.144/evaluation-service/primes',
  f: 'http://20.244.56.144/evaluation-service/fibo',
  e: 'http://20.244.56.144/evaluation-service/even',
  r: 'http://20.244.56.144/evaluation-service/rand'
};

app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;
  const apiUrl = API_MAP[numberid];
  if (!apiUrl) return res.status(400).json({ error: 'Invalid numberid' });

  try {
    const response = await axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      timeout: 500
    });
    console.log('API response:', response.data); // <-- Add this line
    res.json(response.data);
  } catch (err) {
    console.error('Proxy error:', err.message); // <-- Add this line
    res.json({ numbers: [] });
  }
});

app.listen(5000, () => {
  console.log('Proxy server running on http://localhost:5000');
});