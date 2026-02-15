import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

function extractJson(text) {
	if (!text) throw new Error("Empty model response");

	// Remove ```json ... ``` or ``` ... ```
	let cleaned = text.trim();
	cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");

	// If the model adds extra text, try to grab the first {...} block
	const firstBrace = cleaned.indexOf("{");
	const lastBrace = cleaned.lastIndexOf("}");
	if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
		throw new Error("No JSON object found in model response");
	}

	cleaned = cleaned.slice(firstBrace, lastBrace + 1);

	return JSON.parse(cleaned);
}

app.post("/generate", async (req, res) => {
	try {
		const { text } = req.body;
		if (!text || typeof text !== "string") {
			return res.status(400).json({ error: "Missing 'text' string." });
		}

		const instruction = `
Return ONLY valid JSON. No markdown. No \`\`\` fences. No extra text.

Schema (exact keys):
{
  "alternateTimeline": {
    "name": string,
    "politicalChanges": string,
    "technologyShifts": string,
    "culturalImpact": string,
    "modernWorldDifferences": string
  }
}

Rules:
- Keep it historically plausible.
- Each string must be short (1–2 sentences).
`.trim();

		const contents = [
			{ role: "user", parts: [{ text: instruction }] },
			{ role: "user", parts: [{ text: `User request: ${text}` }] },
		];

		const result = await model.generateContent({ contents });
		const rawText = result.response.text();

		// ✅ Make server guarantee valid JSON to frontend
		const json = extractJson(rawText);

		res.json(json); // return actual JSON object, not a string
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.listen(3000, () => console.log("Server running on 3000"));
