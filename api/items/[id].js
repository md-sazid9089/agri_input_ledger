// Vercel Serverless Function for /api/items/[id]
import { readFileSync } from 'fs';
import { join } from 'path';

const items = JSON.parse(
  readFileSync(join(process.cwd(), 'server', 'data', 'items.json'), 'utf8')
);

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const { id } = req.query;
    const item = items.find(item => item.id === id);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    return res.status(200).json(item);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
