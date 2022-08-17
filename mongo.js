const mongoose = require('mongoose')

const help_message = `example usage: 
> node mongo.js <password> <name> <number>
> node mongo.js <passowrd>
`

if (process.argv.length < 3) {
  console.log('Error!\n\n' + help_message)
  process.exit(1)
} else if ((process.argv.length > 3) && (process.argv.length < 5)) {
  console.log('Error!\n\n' + help_message)
  process.exit(1)
}

const password = process.argv[2]

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const addContact = (name, number) => () => {
  const person = new Person({
    name: name,
    number: number
  })
  return person.save()
}

const showContacts = () => () => {
  console.log("phonebook:")
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
  })
}

const callback = (process.argv.length === 5) ? addContact(process.argv[3], process.argv[4]) : showContacts()

const url = `mongodb+srv://fstack-test:${password}@cluster0.ziibnlq.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose
  .connect(url)
  .then(callback)
  .then(() => {
    mongoose.connection.close()
  })
  .catch((err) => console.log(err))