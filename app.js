import express from 'express'
import cors from 'cors'
import errorHandler from './middleware/errorHandler.js'
import { initRouters } from './utils/router.js'

const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
await initRouters(app)
app.use(errorHandler) // 务必放最后
app.listen(port)