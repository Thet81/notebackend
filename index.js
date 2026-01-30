require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./model/note')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.get('/', (request, response)=> {
    response.send('<h1>Hello</h1>')
})

app.get('/api/notes', (request, response)=> {
     Note.find({}).then((note)=> {
        response.json(note)
     })
    
})
app.post('/api/notes',(request, response)=> {
    const body = request.body
    console.log(body)
    if(!body.content) {
        return response.status(400).json({error : 'Content missing'})
    }
    const note = new Note({
        content : body.content,
        important : body.important || false
    })

    note.save().then((savedNote)=> {
        response.json(savedNote)
    })
})


app.get('/api/notes/:id',(request,response)=> {
    const id = request.params.id
    const note = notes.find(n => n.id === id)
    console.log(note)
    if (note) {
        response.json(note)
    }else {
        response.status(404).json({error : "Note not found!"})
    }
})

app.delete('/api/notes/:id',(request,response)=> {
    const id = request.params.id;
    const notes = notes.filter(n=> n.id != id)
    response.status(204).end()
})


const PORT = process.env.PORT || 3000
app.listen(3000, ()=> {
    console.log('Server is running on port 3000')
})