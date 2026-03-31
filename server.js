import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const API_KEY = "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"

app.post('/chat', async (req, res) => {
  try {
    const { message, context } = req.body

    const prompt = `
You are an AI assistant for Sristi's portfolio.

Use ONLY the information below:

${context}

User: ${message}

Answer in a friendly, concise way.
`

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/auto", // ✅ FINAL FIX
        messages: [
          { role: "user", content: prompt }
        ]
      })
    })

    const data = await response.json()

    console.log("🔍 OpenRouter response:", JSON.stringify(data, null, 2))

    let reply = "⚠️ AI is thinking… try again 😄"

    if (data.choices && data.choices.length > 0) {
      reply = data.choices[0].message.content
    } else if (data.error) {
      console.log("❌ API ERROR:", data.error)
      reply = "⚠️ AI temporarily unavailable 😅"
    }

    res.json({ reply })

  } catch (err) {
    console.error("❌ SERVER ERROR:", err)
    res.status(500).json({ reply: "Server crashed 😭" })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on ${PORT}`))

app.get('/', (req, res) => {
  res.send("Backend is running 🚀")
})