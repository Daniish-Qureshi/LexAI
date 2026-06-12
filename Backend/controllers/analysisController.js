import { prisma } from '../config/db.js'
import FormData from 'form-data'
import fetch from 'node-fetch'

export const analyzeDocument = async (req, res) => {
  try {
    const doc = await prisma.document.findUnique({
      where: { id: req.params.id }
    })

    if (!doc) return res.status(404).json({ message: 'Document nahi mila' })
    if (doc.userId !== req.user.id) return res.status(403).json({ message: 'Access nahi' })

    // Cloudinary URL fix
    let cloudinaryUrl = doc.cloudinaryUrl
    if (doc.fileType === 'application/pdf' && cloudinaryUrl.includes('/image/upload/')) {
      cloudinaryUrl = cloudinaryUrl.replace('/image/upload/', '/raw/upload/')
    }

    console.log('Fixed URL:', cloudinaryUrl)

    const fileResponse = await fetch(cloudinaryUrl)
    if (!fileResponse.ok) {
      return res.status(500).json({ message: `File download fail: ${fileResponse.status}` })
    }

    const arrayBuffer = await fileResponse.arrayBuffer()
    const fileBuffer = Buffer.from(arrayBuffer)

    console.log('Buffer size:', fileBuffer.length)

    if (fileBuffer.length === 0) {
      return res.status(500).json({ message: 'File empty hai!' })
    }

    let contentType = doc.fileType
    if (!contentType || contentType === 'application/octet-stream') {
      if (doc.fileName.endsWith('.pdf')) contentType = 'application/pdf'
      else if (doc.fileName.endsWith('.png')) contentType = 'image/png'
      else if (doc.fileName.endsWith('.jpg')) contentType = 'image/jpeg'
    }

    const formData = new FormData()
    formData.append('file', fileBuffer, {
      filename: doc.fileName,
      contentType: contentType,
    })
    formData.append('language', doc.language || 'hindi')
    formData.append('category', doc.category || 'legal')

    const aiResponse = await fetch(`${process.env.AI_SERVICE_URL}/ai/summarize`, {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders()
    })

    // Response JSON hai ya nahi check karo
    const responseContentType = aiResponse.headers.get('content-type')
    if (!responseContentType || !responseContentType.includes('application/json')) {
      const text = await aiResponse.text()
      console.error('AI Service non-JSON:', text.substring(0, 200))
      return res.status(503).json({ 
        message: 'AI Service abhi warm ho rahi hai — 30 seconds baad dobara try karo!' 
      })
    }

    const aiResult = await aiResponse.json()
console.log('Full AI Result:', JSON.stringify(aiResult).substring(0, 500))

if (!aiResult.success) {
  return res.status(500).json({ message: 'AI fail', detail: aiResult })
}

    const updated = await prisma.document.update({
      where: { id: doc.id },
      data: {
        summaryOverview: aiResult.summary.overview,
        summaryKeyPoints: JSON.stringify(aiResult.summary.key_clauses),
        summaryRisks: JSON.stringify(aiResult.risks),
      }
    })

    res.json({
      success: true,
      document: updated,
      summary: aiResult.summary,
      risks: aiResult.risks,
    })

  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ message: error.message })
  }
}