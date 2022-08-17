const persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
  },
  {
    "name": "Mary Poppendieck",
    "number": "211",
  },
  {
    "name": "Isaac Newton",
    "number": "12-34-5678902",
  },
  {
    "name": "Niels Bohr",
    "number": "12-34-5678904",
  },
  {
    "name": "Lise Meitner",
    "number": "12-34-5678905",
  },
  {
    "name": "Enrico Fermi",
    "number": "3-14-15-92-65-35",
  },
  {
    "name": "Albert Hofmann",
    "number": "12-34-5678907",
  },
  {
    "name": "Erwin Schrödinger",
    "number": "12-34-5678908",
  },
  {
    "name": "Stephen Hawking",
    "number": "12-34-5678911",
  },
  {
    "name": "Ernest Rutherford",
    "number": "343032-234322095",
  }
]

const mongoose = require('mongoose')
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const addContact = ({ name, number }) => () => {
  const person = new Person({
    name: name,
    number: number
  })
  return person.save()
}

const password = "Cvjl1sv9J3J3AXwG"
const url = `mongodb+srv://fstack-test:${password}@cluster0.ziibnlq.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

Person
  .insertMany(persons)
  .then(() => {
    mongoose.connection.close()
  })
  .catch((err) => console.log(err))