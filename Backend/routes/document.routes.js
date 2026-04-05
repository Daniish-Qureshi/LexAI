import express from 'express'
import {
  uploadDocument,
  getDocuments,
  deleteDocument,
  toggleFavorite
} from '../controllers/documentController.js'
import protect from '../middleware/auth.js'
import upload from '../middleware/upload.js'

const router = express.Router()

router.post('/upload', protect, upload.single('document'), uploadDocument)
router.get('/history', protect, getDocuments)
router.delete('/:id', protect, deleteDocument)
router.patch('/:id/favorite', protect, toggleFavorite)

export default router