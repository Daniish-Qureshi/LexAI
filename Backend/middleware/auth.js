import jwt from 'jsonwebtoken'
import { prisma } from '../config/db.js'

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'Token nahi mila' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await prisma.user.findUnique({ where: { id: decoded.id } })
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token invalid hai' })
  }
}

export default protect