import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

// .env 로드
dotenv.config();

const app = express();
const PORT = 5000;
const GNEWS_API = 'https://gnews.io/api/v4/search';
const API_KEY = process.env.GNEWS_API_KEY;

if (!API_KEY) {
  console.error('❌ GNEWS_API_KEY is missing in .env');
  process.exit(1);
}

// CORS 허용
app.use(cors());

// 프록시 GET /news?q=korea
app.get('/news', async (req: any, res: any) => {
  const query = req.query.q as string;

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter `q`' });
  }

  const url = `${GNEWS_API}?q=${encodeURIComponent(query)}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`GNews API error: ${response.statusText}`);
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error('❌ Fetch failed:', error);
    return res.status(500).json({ error: 'Failed to fetch news from GNews' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
});
