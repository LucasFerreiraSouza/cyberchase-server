const express = require("express")
const personRoutes = require('./routes/personRoutes')
const questionRoutes = require('./routes/questionRoutes')
require('./config/dbConfig')

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const PORT = process.env.PORT || 3000;


app.use('/api/person', personRoutes)
app.use('/api/question', questionRoutes)

app.listen(PORT)