import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/db.js'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// Register
export const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password)
    return res.status(400).json({ message: 'Sab fields bharo' })

  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists)
    return res.status(400).json({ message: 'Email already registered hai' })

  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { name, email, password: hashed }
  })

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id)
  })
}

// Login
export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user)
    return res.status(400).json({ message: 'Email registered nahi hai' })

  const match = await bcrypt.compare(password, user.password)
  if (!match)
    return res.status(400).json({ message: 'Password galat hai' })

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id)
  })
}

// Get Me
export const getMe = async (req, res) => {
  res.json(req.user)
}