import express from 'express'

import todoRouter from './router/todos'

const app = express()

app.use(express.json())

app.use(todoRouter)


app.listen(3000)