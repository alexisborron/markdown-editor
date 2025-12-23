const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

let documents = [
    {
        id: "1",
        title: "Getting Started with React",
        content: "# Getting Started with React\n\nReact is a JavaScript library for building user interfaces...",
        tags: ["react", "javascript", "tutorial"],
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-16T14:22:00Z"
    },
    {
        id: "2",
        title: "Markdown Syntax Guide",
        content: "# Markdown Syntax Guide\n\n## Headers\n\nUse # for headers. More # symbols = smaller headers.\n\n## Lists\n\n- Item 1\n- Item 2\n- Item 3",
        tags: ["markdown", "documentation"],
        createdAt: "2024-02-01T08:15:00Z",
        updatedAt: "2024-02-01T08:15:00Z"
    },
    {
        id: "3",
        title: "Meeting Notes - Q1 Planning",
        content: "# Q1 Planning Meeting\n\n**Date:** January 20, 2024\n\n## Attendees\n- Alice\n- Bob\n- Charlie\n\n## Action Items\n1. Review budget\n2. Set milestones",
        tags: ["meeting", "planning", "work"],
        createdAt: "2024-01-20T15:45:00Z",
        updatedAt: "2024-01-21T09:10:00Z"
    },
    {
        id: "4",
        title: "Recipe: Chocolate Chip Cookies",
        content: "# Chocolate Chip Cookies\n\n## Ingredients\n- 2 cups flour\n- 1 cup butter\n- 1 cup chocolate chips\n\n## Instructions\n1. Preheat oven to 350°F\n2. Mix ingredients\n3. Bake for 12 minutes",
        tags: ["recipe", "baking", "personal"],
        createdAt: "2024-03-05T18:20:00Z",
        updatedAt: "2024-03-05T18:20:00Z"
    },
    {
        id: "5",
        title: "Project Ideas",
        content: "# Project Ideas\n\n- [ ] Blog platform\n- [ ] Task manager\n- [x] Markdown editor\n- [ ] Weather app",
        tags: ["ideas", "projects"],
        createdAt: "2024-02-28T12:00:00Z",
        updatedAt: "2024-03-10T16:30:00Z"
    }
];

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})
app.get('/api/documents', (request, response) => {
    response.json(documents)
})

app.put('/api/documents/:id', (request, response) => {
    const id = request.params.id
    const body = request.body

    documents = documents.map(doc =>
        doc.id === id ? body : doc
    )

    response.json(body)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})