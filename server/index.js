const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

let documents = [
    {
        id: "1",
        title: "welcome.md",
        content: "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
        tags: ["react", "javascript", "tutorial"],
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-16T14:22:00Z"
    },
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

    const doc = documents.find(doc => doc.id === id)

    if (!doc) {
        return response.status(404).end()
    }

    const updatedDoc = {
        id: doc.id,
        title: body.title || doc.title,
        content: body.content !== undefined ? body.content : doc.content, tags: body.tags || doc.tags,
        createdAt: doc.createdAt,
        updatedAt: new Date().toISOString()
    }

    documents = documents.map(doc =>
        doc.id === id ? updatedDoc : doc
    )

    response.json(updatedDoc)
})

app.post('/api/documents', (request, response) => {
    const body = request.body

    const newDoc = {
        id: (Math.floor(Math.random() * 1_000_000_000)).toString(),
        title: body.title || "untitled-document.md",
        content: body.content || "",
        tags: body.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    documents = documents.concat(newDoc)
    response.json(newDoc)
})

app.delete('/api/documents/:id', (request, response) => {
    const id = request.params.id
    if (documents.find(doc => doc.id === id)) {
        documents = documents.filter(doc => doc.id !== id)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})