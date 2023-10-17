import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()

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