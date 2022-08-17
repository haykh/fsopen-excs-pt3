const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('body', function (req, _res) {
  return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "211",
    "id": 4
  },
  {
    "name": "Isaac Newton",
    "number": "12-34-5678902",
    "id": 6
  },
  {
    "name": "Niels Bohr",
    "number": "12-34-5678904",
    "id": 8
  },
  {
    "name": "Lise Meitner",
    "number": "12-34-5678905",
    "id": 9
  },
  {
    "name": "Enrico Fermi",
    "number": "3-14-15-92-65-35",
    "id": 10
  },
  {
    "name": "Albert Hofmann",
    "number": "12-34-5678907",
    "id": 11
  },
  {
    "name": "Erwin Schrödinger",
    "number": "12-34-5678908",
    "id": 12
  },
  {
    "name": "Stephen Hawking",
    "number": "12-34-5678911",
    "id": 15
  },
  {
    "name": "Ernest Rutherford",
    "number": "343032-234322095",
    "id": 17
  }
]

app.get('/', (_req, res) => {
  res.send('<h1>hi</h1>')
})

app.get('/info', (_req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>`)
})

app.get('/api/persons', (_req, res) => {
  res.json(persons)
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})