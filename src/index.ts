import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'

const PORT = 3333
const app = express()
app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({})

export default app.get('/', async (request, response) => {
  const expense = await prisma.expenses.findMany()

  return response.json(expense)
})

app.get('/list', async (request, response) => {
  const { initialDate } = request.query
  const { finalDate } = request.query

  const list = await prisma.expenses.findMany({
    where: {
      createdAd: {
        gte: new Date(`${initialDate ?? new Date('2022-01-01')}`),
        lte: new Date(`${finalDate ?? new Date()}`),
      },
    },
    orderBy: {
      createdAd: 'desc'
    }
  })

  return response.status(200).json(list)

})

app.post('/', async (request, response) => {
  const { description, type, category, price } = request.body

  const expense = await prisma.expenses.create({
    data: {
      description,
      type,
      category,
      price
    }
  })

  return response.status(201).json(expense)
})

app.listen(PORT, () => {
  console.log(`Api running in PORT ${PORT}`)
})
