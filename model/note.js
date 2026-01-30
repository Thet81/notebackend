
const mongoose = require('mongoose')

const url = process.env.MOGODB_URI

mongoose.connect(url)
    .then(result=> {
        console.log('Connected to the database')
    })
    .catch (e=> {
        console.log(e.message)
    })

const noteSchema = new mongoose.Schema({
    content : String,
    important : Boolean,
})

mongoose.set('toJSON', {
    transform : (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()

        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)