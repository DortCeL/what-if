```markdown
# 🧠 What If?

> A thoughtful AI that helps you see the value of things by imagining a world where they never existed.

**What If?** is a lightweight AI web app that runs alternate timeline simulations.  
Give it a concept — like the internet, electricity, democracy, or coffee — and it generates a historically plausible world where that thing never existed.

The goal?  
To help you understand impact by removing it.

---

## ✨ Features

- 📝 Simple prompt-based interface  
- 🤖 Gemini-powered alternate timeline generation  
- 📦 Clean structured JSON output  
- 🎨 Modern React + Tailwind UI  
- ⚡ Express backend API  
- 🧼 Production-ready JSON parsing  

---

## 🏗 Tech Stack

### Frontend
- React
- TailwindCSS
- Fetch API

### Backend
- Node.js
- Express
- Google Generative AI (Gemini)

---

## 📂 Project Structure

```

.
├── backend/
│   ├── server.js
│   └── package.json
│
├── view/ (frontend)
│   ├── src/
│   └── package.json
│
└── .gitignore

````

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/what-if-ai.git
cd what-if-ai
````

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```
GEMINI_API_KEY=your_api_key_here
```

Start the server:

```bash
node server.js
```

Runs on:

```
http://localhost:3000
```

---

### 3️⃣ Setup Frontend

```bash
cd view
npm install
npm run dev
```

Open:

```
http://localhost:5173

## 🔌 API Endpoint

### `POST /generate`

**Request**

```json
{
  "text": "What if the internet never existed?"
}
```

**Response**

```json
{
  "alternateTimeline": {
    "name": "The Fragmented Continent",
    "politicalChanges": "...",
    "technologyShifts": "...",
    "culturalImpact": "...",
    "modernWorldDifferences": "..."
  }
}
```

Returns pure JSON. No markdown wrappers.

---

## 🌍 Deployment Options

You can deploy this project using:

* Frontend → **Vercel**
* Backend → **Render**
* Or everything on **Cloud Run**

Make sure to set:

```
GEMINI_API_KEY
```

as an environment variable in production.

---

## 🛡 Production Notes

* Restrict CORS to your frontend domain
* Add rate limiting to `/generate`
* Never expose your API key to the frontend
* Validate prompt length before sending to the model

---

## 💡 Why This Exists

We often understand value only when something is gone.

This project uses alternate history as a lens to reflect on:

* Technology
* Culture
* Systems
* Institutions
* Everyday conveniences

It’s not about prediction.
It’s about perspective.

---

## 🔮 Future Ideas

* Save/share timelines
* Side-by-side timeline comparison
* Visual timeline maps
* Streaming responses
* User accounts

---

## 🧘 Philosophy

> Sometimes the best way to understand something
> is to imagine a world without it.
