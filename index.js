require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

morgan.token('body', function (req, _res) {
  return JSON.stringify(req.body)
})

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('build'))

app.get('/', (_req, res) => {
  res.send('<h1>hi</h1>')
})

app.get('/info', (_req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>`)
})

app.get('/api/persons', (_req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const newID = Math.floor(Math.random() * 1000000);
  if (!(req.body.name && req.body.number)) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }
  if (persons.find(p => p.name === req.body.name)) {
    return res.status(400).json({
      error: 'name exists in phonebook'
    })
  }
  const newPerson = {
    id: newID,
    name: req.body.name,
    number: req.body.number
  }
  persons = persons.concat(newPerson)
  res.json(newPerson)
})

app.put('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const newPerson = req.body
  persons = persons.map(p => p.id !== id ? p : newPerson)
  res.json(newPerson)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})