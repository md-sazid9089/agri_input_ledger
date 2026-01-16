const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}));
app.use(express.json());

// Data file path
const DATA_FILE = path.join(__dirname, 'data', 'items.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize data file with seed data if it doesn't exist
function initializeData() {
  if (!fs.existsSync(DATA_FILE)) {
    const seedData = [
      {
        id: '1',
        name: 'Premium Basmati Rice Seeds',
        description: 'High-yield basmati rice seeds resistant to common pests. Certified by Bangladesh Agricultural Development Corporation. Ideal for kharif season with 120-day maturity.',
        price: 1250,
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500',
        category: 'Seed',
        certification: 'Govt Approved',
        vendor: 'Bangladesh Agricultural Development Corp (BADC)',
        cropTags: 'Rice, Paddy, Basmati',
        dosage: '20-25 kg per hectare. Sow at 2-3 cm depth with 20x15 cm spacing.',
        safetyNotes: 'Treat seeds with fungicide before sowing. Store in cool, dry place away from direct sunlight.',
      },
      {
        id: '2',
        name: 'Urea Fertilizer (46% N)',
        description: 'Premium grade urea with 46% nitrogen content. Government-subsidized fertilizer for all crops. Increases vegetative growth and improves yield.',
        price: 850,
        imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500',
        category: 'Fertilizer',
        certification: 'Govt Approved',
        vendor: 'Bangladesh Chemical Industries Corporation (BCIC)',
        cropTags: 'Rice, Wheat, Maize, Sugarcane, Jute',
        dosage: '120-150 kg per hectare split in 2-3 applications. Apply after irrigation or rain.',
        safetyNotes: 'Wear gloves when handling. Avoid contact with skin and eyes. Store in moisture-free area.',
      },
      {
        id: '3',
        name: 'Chlorpyrifos 20% EC Pesticide',
        description: 'Broad-spectrum insecticide effective against termites, aphids, and bollworms. Approved for use on jute, rice, and vegetables.',
        price: 680,
        imageUrl: 'https://images.unsplash.com/photo-1617791160588-241658c0f566?w=500',
        category: 'Pesticide',
        certification: 'Govt Approved',
        vendor: 'Crystal Crop Protection',
        cropTags: 'Jute, Rice, Vegetables, Fruit crops',
        dosage: '2-2.5 ml per liter of water. Spray during early morning or evening. Repeat after 15 days if needed.',
        safetyNotes: 'HIGHLY TOXIC. Wear full PPE including mask, gloves, and protective clothing. Do not eat, drink, or smoke during application. Wash thoroughly after use. Keep away from children and pets.',
      },
      {
        id: '4',
        name: 'Hybrid Wheat Seeds (DBW-187)',
        description: 'High-yielding wheat variety suitable for timely sown irrigated conditions. Resistant to rust and tolerates heat stress.',
        price: 980,
        imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500',
        category: 'Seed',
        certification: 'NGO Verified',
        vendor: 'Bangladesh Agricultural Research Institute (BARI)',
        cropTags: 'Wheat, Rabi crops',
        dosage: '100 kg per hectare. Sow at 5 cm depth with row spacing of 20-22.5 cm.',
        safetyNotes: 'Use certified seeds only. Ensure proper seed treatment with fungicides before sowing.',
      },
      {
        id: '5',
        name: 'NPK Complex Fertilizer (19:19:19)',
        description: 'Balanced NPK fertilizer providing equal amounts of nitrogen, phosphorus, and potassium. Suitable for all crops at all growth stages.',
        price: 1450,
        imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500',
        category: 'Fertilizer',
        certification: 'Company Certified',
        vendor: 'Karnaphuli Fertilizer Company Limited (KAFCO)',
        cropTags: 'All crops, Vegetables, Fruits',
        dosage: '200-250 kg per hectare. Apply in splits at vegetative and flowering stages.',
        safetyNotes: 'Avoid direct contact with skin. Use gloves and mask. Store away from food items.',
      },
      {
        id: '6',
        name: 'Glyphosate 41% SL Herbicide',
        description: 'Non-selective, post-emergence herbicide for controlling annual and perennial weeds. Systemic action through foliage.',
        price: 520,
        imageUrl: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=500',
        category: 'Pesticide',
        certification: 'Govt Approved',
        vendor: 'ACI Crop Care & Public Health',
        cropTags: 'Tea, Rubber, Betel nut, Orchards',
        dosage: '1.5-2 liters per hectare in 200-400 liters of water. Apply on actively growing weeds.',
        safetyNotes: 'Avoid spray drift to nearby crops. Wear protective clothing and mask. Do not contaminate water sources.',
      },
      {
        id: '7',
        name: 'Hybrid Maize Seeds (DHM-117)',
        description: 'High-yielding triple cross hybrid maize seeds with excellent grain quality. Suitable for both kharif and rabi seasons.',
        price: 1850,
        imageUrl: 'https://images.unsplash.com/photo-1603104903111-5c814337a818?w=500',
        category: 'Seed',
        certification: 'Govt Approved',
        vendor: 'Lal Teer Seed Limited',
        cropTags: 'Maize, Corn',
        dosage: '20-22 kg per hectare. Plant at 60x20 cm spacing with 5 cm sowing depth.',
        safetyNotes: 'Ensure seed treatment with imidacloprid for protection against early pests.',
      },
      {
        id: '8',
        name: 'Organic Vermicompost Fertilizer',
        description: 'Premium quality vermicompost rich in nutrients and beneficial microorganisms. 100% organic and eco-friendly soil conditioner.',
        price: 450,
        imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500',
        category: 'Fertilizer',
        certification: 'NGO Verified',
        vendor: 'Bangladesh Organic Products Manufacturers Association',
        cropTags: 'All crops, Vegetables, Fruits, Flowers',
        dosage: '2-5 tonnes per hectare. Mix with soil before planting or apply as top dressing.',
        safetyNotes: 'Completely safe. No protective gear needed. Store in shaded area.',
      },
      {
        id: '9',
        name: 'Lambda-Cyhalothrin 5% EC',
        description: 'Fast-acting synthetic pyrethroid insecticide effective against lepidopteran and hemipteran pests. Long residual activity.',
        price: 790,
        imageUrl: 'https://images.unsplash.com/photo-1617791160588-241658c0f566?w=500',
        category: 'Pesticide',
        certification: 'Govt Approved',
        vendor: 'Auto Crop Care Limited',
        cropTags: 'Jute, Chilli, Cabbage, Tomato',
        dosage: '300-400 ml per hectare in 400-600 liters of water. Apply at pest appearance.',
        safetyNotes: 'Toxic to fish and aquatic organisms. Wear full PPE. Do not spray near water bodies.',
      },
      {
        id: '10',
        name: 'Tomato Hybrid Seeds (Himsona F1)',
        description: 'Determinate hybrid tomato variety with excellent fruit quality. Resistant to leaf curl virus and bacterial wilt.',
        price: 2400,
        imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=500',
        category: 'Seed',
        certification: 'Company Certified',
        vendor: 'BRAC Seed & Agro Enterprise',
        cropTags: 'Tomato, Vegetables',
        dosage: '200-250 grams per hectare. Sow in nursery and transplant after 25-30 days.',
        safetyNotes: 'Use well-drained soil. Treat seedbed with fungicide to prevent damping off.',
      },
      {
        id: '11',
        name: 'Single Super Phosphate (SSP 16%)',
        description: 'Phosphatic fertilizer containing 16% P2O5 along with calcium and sulfur. Essential for root development and flowering.',
        price: 720,
        imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500',
        category: 'Fertilizer',
        certification: 'Govt Approved',
        vendor: 'Jamuna Fertilizer Company Limited',
        cropTags: 'Oilseeds, Pulses, Sugarcane',
        dosage: '200-300 kg per hectare as basal application before sowing.',
        safetyNotes: 'Avoid inhalation of dust. Use mask when handling. Store in dry conditions.',
      },
      {
        id: '12',
        name: 'Neem Oil 1500 PPM (Azadirachtin)',
        description: 'Organic pesticide derived from neem seeds. Effective against wide range of pests with no harmful residues. Safe for beneficial insects.',
        price: 850,
        imageUrl: 'https://images.unsplash.com/photo-1603349206295-dde20617cb6a?w=500',
        category: 'Pesticide',
        certification: 'NGO Verified',
        vendor: 'Bangladesh Neem Foundation',
        cropTags: 'All crops, Organic farming',
        dosage: '3-5 ml per liter of water. Spray every 10-15 days or as needed.',
        safetyNotes: 'Eco-friendly and safe. No special protective gear needed. Store away from direct sunlight.',
      },
    ];

    fs.writeFileSync(DATA_FILE, JSON.stringify(seedData, null, 2));
    console.log('✅ Seed data initialized successfully');
  }
}

// Helper function to read items from file
function readItems() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading items:', error);
    return [];
  }
}

// Helper function to write items to file
function writeItems(items) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing items:', error);
    return false;
  }
}

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'AgriInput Ledger API is running' });
});

// GET all items
app.get('/api/items', (req, res) => {
  try {
    const items = readItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// GET single item by ID
app.get('/api/items/:id', (req, res) => {
  try {
    const items = readItems();
    const item = items.find(i => i.id === req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

// POST new item
app.post('/api/items', (req, res) => {
  try {
    const {
      name,
      description,
      price,
      imageUrl,
      category,
      certification,
      vendor,
      cropTags,
      dosage,
      safetyNotes,
    } = req.body;

    // Basic validation
    if (!name || !description || !price || !category || !certification) {
      return res.status(400).json({
        error: 'Missing required fields: name, description, price, category, certification',
      });
    }

    const items = readItems();
    
    // Generate new ID
    const maxId = items.length > 0 
      ? Math.max(...items.map(i => parseInt(i.id))) 
      : 0;
    const newId = String(maxId + 1);

    const newItem = {
      id: newId,
      name,
      description,
      price: Number(price),
      imageUrl: imageUrl || 'https://placehold.co/500x400?text=No+Image',
      category,
      certification,
      vendor: vendor || 'Unknown Vendor',
      cropTags: cropTags || '',
      dosage: dosage || '',
      safetyNotes: safetyNotes || '',
    };

    items.push(newItem);
    
    if (writeItems(items)) {
      res.status(201).json(newItem);
    } else {
      res.status(500).json({ error: 'Failed to save item' });
    }
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// Initialize data and start server
initializeData();

app.listen(PORT, () => {
  console.log(`🚀 Express API server running on http://localhost:${PORT}`);
  console.log(`📊 Endpoints available:`);
  console.log(`   GET  /api/items       - Get all items`);
  console.log(`   GET  /api/items/:id   - Get single item`);
  console.log(`   POST /api/items       - Create new item`);
});
