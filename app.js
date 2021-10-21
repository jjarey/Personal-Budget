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
  })

app.post('/envelopes', (req, res) => {
    // add new envelope
    myEnvelopes.push(req.body)
    res.status(201).send("New envelope added")
})

app.put('/envelopes/transfer/:from/:to', (req, res) => {
    myEnvelopes.forEach(x => {
        if (x.id == req.params.from) {
            let indexFrom = myEnvelopes.indexOf(x)
            myEnvelopes.forEach(y => {
                if (y.id == req.params.to) {
                    let indexTo = myEnvelopes.indexOf(y)
                    // transfer budget from x to y
                    myEnvelopes[indexTo].budget += myEnvelopes[indexFrom].budget
                    myEnvelopes[indexFrom].budget = 0
                    res.status(200).send("Budgets updated")
                }
            })
        }
    })
    res.status(404).send("Not found")
})

app.delete('/envelopes/:id', (req, res) => {
    myEnvelopes.forEach(item => {
        if (item.id == req.params.id) {
            let index = myEnvelopes.indexOf(item)
            // delete envelope
            myEnvelopes.splice(index, 1)
            res.status(204).send()
        }
    })    
    res.status(404).send("Not found")
  })

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})