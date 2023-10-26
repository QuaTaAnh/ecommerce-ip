import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connect from "./config/db.js"
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoute.js'
import productRoutes from './routes/productRoute.js'
import cors from 'cors'

dotenv.config()

//dataconfig
connect()

const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)

//rest api
app.get('/', (req, res) =>{
    res.send("<h1>API Iphone Like New</h1>")
})

//PORT
const PORT = process.env.PORT || 8080

//run
app.listen(PORT, () =>{
    console.log(`Server localhost:${PORT}`)
})