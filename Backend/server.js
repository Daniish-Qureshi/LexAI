import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import documentRoutes from './routes/document.routes.js'
import analysisRoutes from './routes/analysis.routes.js'

dotenv.config()
connectDB()

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://lex-ai-coral-theta.vercel.app'
  ],
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/documents', documentRoutes)
app.use('/api/analyze', analysisRoutes)

app.get('/', (req, res) => {
  res.json({ message: '⚖️ LexAI Backend Running!' })
})

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))