const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const dialogflow = require('dialogflow')

const baseUrl = 'https://dialogflow.googleapis.com'

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

//get agent 
app.get(`/v2beta1/{parent=projects/northernirishparent}/agent`)

app.listen(port, () => console.log(`App loading on localhost:${port}`))