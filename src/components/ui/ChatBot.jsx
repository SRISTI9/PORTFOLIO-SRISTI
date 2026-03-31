import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { chatbotKnowledge } from '../../data/resume'

const SUGGESTIONS = [
  'Tell me about AgentX',
  'What skills does Sristi have?',
  'Show me the projects',
  'Is she open to internships?',
  'Hackathon achievements?',
]

const INITIAL_MSG = {
  role: 'bot',
  text: "Hi! I'm Sristi's AI assistant 👋 Ask me anything about her projects, skills, or experience!"
}

// ✅ NOW CALLING YOUR BACKEND
async function askGemini(userMessage) {
  const res = await fetch('https://portfolio-sristi-production.up.railway.app/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: userMessage,
      context: chatbotKnowledge
    })
  })

  if (!res.ok) {
    throw new Error('Server error')
  }

  const data = await res.json()
  return data.reply
}

function Dots() {
  return (
    <div className="flex gap-1 items-center px-1 py-0.5">
      {[0,1,2].map(i => (
        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-neon-blue"
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
      ))}
    </div>
  )
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([INITIAL_MSG])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200)
  }, [open])

  const send = async (text) => {
    const msg = (text || input).trim()
    if (!msg || loading) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setLoading(true)

    try {
      const reply = await askGemini(msg)
      setMessages(prev => [...prev, { role: 'bot', text: reply }])
    } catch (e) {
      console.error(e)
      setMessages(prev => [
        ...prev,
        { role: 'bot', text: "⚠️ AI is waking up... try again 😄" }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* FLOAT BUTTON */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{
          background: 'linear-gradient(135deg, #00D4FF, #7C3AED)',
          boxShadow: '0 0 30px rgba(0,212,255,0.4)'
        }}
      >
        {open ? '✕' : '🤖'}
      </motion.button>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[360px] max-h-[520px] rounded-2xl overflow-hidden z-50 flex flex-col"
            style={{
              background: 'rgba(4,9,18,0.97)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(0,212,255,0.2)'
            }}
          >

            {/* HEADER */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
              <div className="text-white font-semibold text-sm">Sristi AI</div>
              <div className="text-xs text-white/30">● Online</div>
              <button
                onClick={() => setMessages([INITIAL_MSG])}
                className="ml-auto text-xs text-white/30"
              >
                Clear
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`px-3 py-2 rounded-xl text-xs max-w-[80%] ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-white/5 text-white/80'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && <Dots />}

              <div ref={bottomRef} />
            </div>

            {/* SUGGESTIONS */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[10px] px-3 py-1 rounded-lg border border-neon-blue/20 text-neon-blue"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* INPUT */}
            <div className="flex items-center gap-2 p-3 border-t border-white/5">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask something..."
                className="flex-1 bg-white/5 text-white text-xs px-3 py-2 rounded-xl"
              />
              <button
                onClick={() => send()}
                className="px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white text-xs"
              >
                Send
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}