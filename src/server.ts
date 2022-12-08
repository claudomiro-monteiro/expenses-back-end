import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({})

app.get('/', async (request, response) => {
  const expense = await prisma.expenses.findMany()

  return response.json(expense)
})

app.get('/list', async (request, response) => {
  const { description } = request.query
  
  const list = await prisma.expenses.findMany({
    where: {
      createdAd: {
        lte: new Date(`${description}`) 
      }
      // OR: [
      //   {
      //     description: {
      //       startsWith: `${description ?? ''}`
      //     }
      //   },
      //   {
      //     description: {
      //       endsWith: `${description ?? ''}`
      //     }
      //   }
      // ]
    },
    orderBy: {
      createdAd: 'desc'
    }
  })
  // console.log(`${description}`)
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

app.listen(3333)