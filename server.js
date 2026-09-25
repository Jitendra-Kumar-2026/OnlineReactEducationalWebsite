import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Email sending is handled client-side through EmailJS.',
  })
})

app.listen(port, () => {
  console.log(`App backend running on http://localhost:${port}`)
})
