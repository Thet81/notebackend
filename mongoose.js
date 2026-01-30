

const mongoose = require('mongoose')



if (!process.argv.length > 3) {
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://thetnaingoo1530_db_user:${password}@cluster0.owgcwei.mongodb.net/noteApp?appName=Cluster0`

mongoose.connect(url)

const noteSchema = new mongoose.Schema ({
    content : String,
    important : Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//     content : 'mongoose makes things easy',
//     important : true
// })

// note.save().then ((n)=> {
//     console.log(n)
//     mongoose.connection.close()
// })

Note.find({})
    .then((note)=> {
        note.forEach(n=> {
            console.log(n)
        })
        mongoose.connection.close()
    })
