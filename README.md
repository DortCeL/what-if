# 🧠 What If?
A thoughtful AI that helps you see the value of things by imagining a world where they never existed.

Give it a concept — like the internet, electricity, democracy, or coffee — and it generates a historically plausible world where that thing never existed.

The goal?  
To help you understand the impact of something just by removing it.

---

## Features

- Simple prompt-based interface
- Gemini-powered alternate timeline generation
- Clean structured JSON output  
- React + Tailwind UI  
- Express backend API  
- Robust JSON parsing

---

## Tech Stack

### Frontend
- React
- TailwindCSS
- Fetch API

### Backend
- Node.js
- Express
- Google Generative AI (Gemini)

---

## How to run as a developer

### 1️⃣ Clone the repo

```bash
git clone https://github.com/DortCeL/what-if.git
cd what-if
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

---

### 3️⃣ Setup Frontend

```bash
cd view
npm install
```

### 🏃‍➡️ RUN

From the root directory run "npm install" and "npm run dev". `Concurrently` will run the backend and frontend with one command. Enjoy ;)

**Sample Response**

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

## Author's philosophy

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

## Future Ideas

* Save/share timelines
* Side-by-side timeline comparison
* Visual timeline maps
* Streaming responses
* User accounts

---

