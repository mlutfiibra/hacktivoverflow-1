require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const questionRoutes = require('./routes/questionRoutes')
const answerRoutes = require('./routes/answerRoutes')
const CronJob = require('cron').CronJob
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(process.env.NEWS_API)
const http = require('http').Server(app)
const io = require('socket.io')(http)

mongoose.connect('mongodb://localhost/hacktivoverflow', {useNewUrlParser: true})

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cors())

io.on('connection', (socket) => {
  console.log('new connection created')
})

new CronJob('0 0 0 * * *', function() {
  newsapi.v2.sources({
    category: 'technology',
    language: 'en',
    country: 'us'
  }).then(response => {
    io.emit('news', response.sources[Math.floor(Math.random() * response.sources.length)])
  })
}, null, true, 'Asia/Jakarta')

app.use('/users', userRoutes)
app.use('/questions', questionRoutes)
app.use('/answers', answerRoutes)

http.listen(port, () => console.log('listening on port', port))