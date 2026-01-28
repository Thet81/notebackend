
const express = require('express')
const app = express()

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

const persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.get('/', (request, response)=> {
    response.send('<h1>Hello</h1>')
})

app.get('/api/notes', (request, respone)=> {
    respone.json(persons) 
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

app.post('/api/notes',(request, response)=> {
    const body = request.body
    const maxID = notes.length > 0 
        ? Math.max(...notes.map(n=> n.id))
        : 0

    if (!body) {
        return response.status(204).end()
    }

    const note = {
        content : body.content,
        important : body.important || false,
        id : generateID()
    }

    notes = notes.concat(note)
    response.json(note)
})

function generateID () {
    const maxID = notes.length > 0 
        ? Math.max(...notes.map(n=> n.id))
        : 0
    return String(maxID + 1)
}
app.listen(3000, ()=> {
    console.log('Server is running on port 3000')
})