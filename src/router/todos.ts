import { Router } from "express";

import Todo from '../model/todo'

const router = Router()

type RequestBody = { text: string }
type RequestParams = { todoId: string }

let todos: Todo[] = []

router.get('/', (req, res, next) => {
    res.status(200).json({todos: todos})
})

router.post('/todo', (req,res, next) => {
    const body = req.body as RequestBody
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    }

    todos.push(newTodo)

    res.status(200).json({ message: 'Todo created', todo: newTodo, todos: todos })
})

router.put('/todo/:todoId', (req, res, next) => {
    const body = req.body as RequestBody
    const params = req.params as RequestParams
    const todoId = params.todoId
    const todoIndex = todos.findIndex(todo => todo.id === todoId)
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text }
        return res.status(201).json({ message: 'Todo success edited', todo: todos[todoIndex] })
    }
    return res.status(404).json({ message: 'Not found' })
})

router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams
    const todoId = params.todoId
    todos = todos.filter(todo => todo.id !== todoId)

    res.status(200).json({ message: 'Todo deleted', todos: todos })
})

export default router