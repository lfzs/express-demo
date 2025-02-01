import express from 'express'
import cors from 'cors'
import errorHandler from './middleware/errorHandler.js'
import { initModels } from './model/index.js'
import { initRoutes } from './router/index.js'
express.Router()
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
await initModels()
await initRoutes(app)
app.use(errorHandler) // 务必放最后
app.listen(port)