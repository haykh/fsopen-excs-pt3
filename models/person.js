const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(() => {
    console.log('connected to the db')
  })
  .catch(err => {
    console.log('error connecting to db', err.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)