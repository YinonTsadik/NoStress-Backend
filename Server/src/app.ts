import express from 'express'
import { logger } from './logger'

import { Knapsack, solve } from './knapsack'
import { Task, updateDetails } from './task'

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(logger)

let tasks: Task[] = new Array()
let tasksCounter: number = 0

// Get all the tasks
app.get('/api/tasks', (req, res) => {
    res.status(200).json({ success: true, msg: 'Tasks List', data: tasks })
})

// Get a task by ID
app.get('/api/tasks/:id', (req, res) => {
    const { id } = req.params
    const task = tasks.find((task) => task.id === Number(id))

    if (!task) {
        return res
            .status(404)
            .json({ success: false, msg: `No task with id: ${id}` })
    }

    return res.status(200).json({ success: true, msg: `Task #${id}`, data: task })
})

// Make a new task
app.post('/api/tasks', (req, res) => {
    const task = req.body as Task

    if (!task.description || !task.deadline || !task.hours) {
        return res
            .status(404)
            .json({ success: false, msg: 'Please provide a legal task' })
    }

    tasksCounter++

    task.id = tasksCounter
    // task.startTime = new Date()
    // task.endTime = new Date()
    task.deadline = new Date(task.deadline)
    updateDetails(task)

    tasks.push(task)
    return res.status(201).json({ success: true, msg: 'Task Created', data: tasks })
})

// Update a task
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params
    const newTask = req.body as Task
    const task = tasks.find((task) => task.id === Number(id))

    if (!task) {
        return res
            .status(404)
            .json({ success: false, msg: `No task with id: ${id}` })
    }

    tasks = tasks.map((task) => {
        if (task.id === Number(id)) {
            task = newTask
        }
        return task
    })

    res.status(200).json({ success: true, msg: 'Task updated', data: tasks })
})

// Remove a task
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params
    const task = tasks.find((task) => task.id === Number(id))

    if (!task) {
        return res
            .status(404)
            .json({ success: false, msg: `No task with id: ${id}` })
    }

    tasks = tasks.filter((task) => task.id !== Number(id))
    res.status(200).json({ success: true, msg: 'Tasks removed', data: tasks })
})

// knapsack solution
app.post('/api/tasks/knapsack', (req, res) => {
    const knapsack = req.body as Knapsack
    const solution = solve(knapsack)
    res.status(201).json({ success: true, data: solution })
})

app.listen(PORT, () => {
    console.log(`~ Server is running on port ${PORT}`)
})
