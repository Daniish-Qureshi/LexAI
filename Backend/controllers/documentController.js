import { prisma } from '../config/db.js'
import cloudinary from '../config/cloudinary.js'

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Koi file nahi mili' })
    }

    const { category = 'legal', language = 'hindi' } = req.body
    const isPDF = req.file.mimetype === 'application/pdf'

    // PDF ke liye resource_type raw, image ke liye image
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'lexai/documents',
          resource_type: isPDF ? 'raw' : 'image',
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(req.file.buffer)
    })

    const document = await prisma.document.create({
      data: {
        userId: req.user.id,
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        cloudinaryUrl: result.secure_url,
        category,
        language,
      }
    })

    res.status(201).json({
      message: 'Document upload ho gaya!',
      document
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getDocuments = async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    })
    res.json(documents)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteDocument = async (req, res) => {
  try {
    const doc = await prisma.document.findUnique({
      where: { id: req.params.id }
    })
    if (!doc) return res.status(404).json({ message: 'Document nahi mila' })
    if (doc.userId !== req.user.id) return res.status(403).json({ message: 'Access nahi hai' })
    await prisma.document.delete({ where: { id: req.params.id } })
    res.json({ message: 'Document delete ho gaya!' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const toggleFavorite = async (req, res) => {
  try {
    const doc = await prisma.document.findUnique({
      where: { id: req.params.id }
    })
    if (!doc) return res.status(404).json({ message: 'Document nahi mila' })
    const updated = await prisma.document.update({
      where: { id: req.params.id },
      data: { isFavorite: !doc.isFavorite }
    })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}