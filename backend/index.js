import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connect from "./config/db.js"
import authRoutes from './routes/authRoute.js'

dotenv.config()

//dataconfig
connect()

const app = express()

//middlewares
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth', authRoutes)

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