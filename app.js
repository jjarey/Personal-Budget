const express = require('express')
const app = express()
const port = 3000

require('dotenv').config()

let myEnvelopes = [
    {
        id: 1,
        name: "groceries",
        budget: 200
    },
    {
        id: 2,
        name: "electricity",
        budget: 100
    },
    {
        id: 3,
        name: "rent",
        budget: 400 
    }
]

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello there!')
})

app.get('/envelopes', (req, res) => {
    res.send(myEnvelopes)
})

app.get('/envelopes/:id', (req, res) => {
    myEnvelopes.forEach(item => {
        if (item.id == req.params.id) {
            res.send(item)
        }
    })
    res.status(404).send("Not found")
  });

app.post('/envelopes', (req, res) => {
    myEnvelopes.push(req.body)
    res.status(201).send("New envelope added")
})

app.delete('/envelopes/:id', (req, res) => {
    myEnvelopes.forEach(item => {
        if (item.id == req.params.id) {
            let index = myEnvelopes.indexOf(item)
            myEnvelopes.splice(index, 1)
            res.status(204).send()
        }
    })    
    res.status(404).send("Not found")
  })

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
});