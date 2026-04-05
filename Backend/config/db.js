import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  log: ['error']
})

const connectDB = async () => {
  try {
    await prisma.$connect()
    console.log('✅ PostgreSQL Connected via Neon.tech!')
  } catch (error) {
    console.error(`❌ Database Error: ${error.message}`)
    process.exit(1)
  }
}

export { prisma }
export default connectDB