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
  name: {
    type: String,
    required: [true, "contact name is required"],
    minlength: [3, "contact name must be at least 3 characters long"],
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        const nnumbs = v.replaceAll('-', '').length
        let valid = /^\d+$/.test(v.replaceAll('-', ''))
        valid = valid && (nnumbs >= 8)
        const vnew = v.split('-')
        if (vnew.length > 1) {
          valid = valid && ((vnew[0].length === 3) || (vnew[0].length === 2))
        } else if (vnew.length < 1) {
          valid = false
        }
        return valid
      },
      message: props => `${props.value} is not a valid phone number`
    },
    required: [true, "contact number is required"],
  }
})

personSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)