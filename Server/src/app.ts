import express from 'express'
import { logger } from './logger'
import { Knapsack, solve } from './knapsack'
import { tasks } from './data'
import { Task } from './task'

const app = express()
const PORT = 5000
app.use(express.json())
app.use(logger)

app.get('/api/tasks', (req, res) => {
    res.status(200).json({ success: true, data: tasks })
})

app.post('/api/tasks/knapsack', (req, res) => {
    const knapsack = req.body as Knapsack
    const solution = solve(knapsack)
    res.status(201).json({ success: true, data: solution })
})

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params
    const newTask = req.body as Task
    const task = tasks.find((task) => task.id === Number(id))

    if (!task) {
        return res
            .status(404)
            .json({ success: false, msg: `No task with id: ${id}` })
    }

    const newTasks = tasks.map((task) => {
        if (task.id === Number(id)) {
            task = newTask
        }
        return task
    })

    res.status(200).json({ success: true, data: newTasks })
})

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params
    const task = tasks.find((task) => task.id === Number(id))

    if (!task) {
        return res
            .status(404)
            .json({ success: false, msg: `No task with id: ${id}` })
    }

    const newTasks = tasks.filter((task) => task.id !== Number(id))
    res.status(200).json({ success: true, data: newTasks })
})

app.listen(PORT, () => {
    console.log(`~ Server is running on port ${PORT}`)
})
