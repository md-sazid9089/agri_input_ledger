// Vercel Serverless Function for /api/items
import items from '../../server/data/items.json';

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json(items);
  }

  if (req.method === 'POST') {
    const newItem = {
      id: String(Date.now()),
      ...req.body,
    };
    
    // Note: In serverless, we can't write to files
    // Return the item as if it was saved
    return res.status(201).json(newItem);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
