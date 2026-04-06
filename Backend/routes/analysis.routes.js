import express from 'express'
import { analyzeDocument } from '../controllers/analysisController.js'
import protect from '../middleware/auth.js'

const router = express.Router()

router.post('/:id', protect, analyzeDocument)

export default router