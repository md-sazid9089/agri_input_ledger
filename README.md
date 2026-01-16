# 🌾 AgriInput Ledger

A modern web application for managing agricultural inputs (seeds, fertilizers, pesticides) with a focus on supporting UN SDG goals.

## 🚀 Live Demo

**Live Site:** [https://agri-input-ledger.vercel.app](https://agri-input-ledger.vercel.app)

## ✨ Features

- 📊 Browse and filter agricultural items by category
- ➕ Add new items to the inventory
- 🔐 Admin authentication system
- 📱 Fully responsive design with modern UI
- 🎨 Glass-morphism effects and smooth animations
- 🌍 SDG-focused landing page highlighting sustainability goals

## 🛠️ Tech Stack

- **Frontend:** Next.js 15.5.9 (App Router) + React 19
- **Styling:** Tailwind CSS with custom animations
- **Backend:** Vercel Serverless Functions
- **Data:** JSON-based storage
- **Deployment:** Vercel

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/md-sazid9089/agri_input_ledger.git
cd agri_input_ledger
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔑 Admin Login

- **Email:** admin@agriinputledger.org
- **Password:** ledger123

## 📁 Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── page.js          # Landing page
│   ├── items/           # Items catalog
│   ├── add-item/        # Add new item form
│   └── login/           # Admin login
├── components/          # Reusable components
├── api/                 # Serverless API routes
│   └── items/          # Items CRUD endpoints
└── server/             # Data storage
    └── data/
        └── items.json  # Items database
```

## 🌐 API Endpoints

- `GET /api/items` - Fetch all items
- `GET /api/items/:id` - Fetch single item
- `POST /api/items` - Add new item (in-memory only)

## 📝 License

MIT License - feel free to use this project for learning or personal use.

## 👤 Author

**Md Sazid**
- GitHub: [@md-sazid9089](https://github.com/md-sazid9089)
