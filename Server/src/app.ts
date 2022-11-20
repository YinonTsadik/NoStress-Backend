import express from 'express'
import { logger } from './services/logger'

import { updateHours } from './services/period'
import { Task, updateDetails } from './services/task'
import { Constraint } from './services/constraint'
import { Knapsack, solve } from './services/knapsack'

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(logger)

let tasks: Task[] = new Array()
let constraints: Constraint[] = new Array()

// ============================== Tasks ==============================

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
    const { description, deadline, hours } = req.body

    // Make sure that the basic parameters was provided
    if (!description || !deadline || !hours) {
        return res
            .status(404)
            .json({ success: false, msg: 'Please provide a legal task' })
    }

    const task = {
        id: tasks.length + 1,
        description: description,
        deadline: new Date(deadline),
        hours: hours,
    }

    updateDetails(task as Task)
    tasks.push(task as Task)

    return res.status(201).json({ success: true, msg: 'Task Created', data: tasks })
})

// Update a task
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params
    const task = tasks.find((task) => task.id === Number(id))

    if (!task) {
        return res
            .status(404)
            .json({ success: false, msg: `No task with id: ${id}` })
    }

    const { description, deadline, hours } = req.body

    if (description) {
        task.description = description
    }
    if (deadline) {
        task.deadline = deadline
    }
    if (hours) {
        task.hours = hours
    }

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
    res.status(200).json({ success: true, msg: 'Task removed', data: tasks })
})

// ============================== Constraints ==============================

// Get all the constraints
app.get('/api/constraints', (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'Constraints List',
        data: constraints,
    })
})

// Get a constraint by ID
app.get('/api/constraints/:id', (req, res) => {
    const { id } = req.params
    const constraint = constraints.find((constraint) => constraint.id === Number(id))

    if (!constraint) {
        return res
            .status(404)
            .json({ success: false, msg: `No constraint with id: ${id}` })
    }

    return res
        .status(200)
        .json({ success: true, msg: `Constraint #${id}`, data: constraint })
})

// Make a new constraint
app.post('/api/constraints', (req, res) => {
    const { description, type, startTime, endTime } = req.body

    // Make sure that the basic parameters was provided
    if (!description || !type || !startTime || !endTime) {
        return res
            .status(404)
            .json({ success: false, msg: 'Please provide a legal constraint' })
    }

    const constraint = {
        id: constraints.length + 1,
        description: description,
        type: type,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
    }

    updateHours(constraint as Constraint)
    constraints.push(constraint as Constraint)

    return res
        .status(201)
        .json({ success: true, msg: 'Constraint Created', data: constraints })
})

// Update a constraint
app.put('/api/constraints/:id', (req, res) => {
    const { id } = req.params
    const constraint = constraints.find((constraint) => constraint.id === Number(id))

    if (!constraint) {
        return res
            .status(404)
            .json({ success: false, msg: `No constraint with id: ${id}` })
    }

    const { description, type, startTime, endTime } = req.body

    if (description) {
        constraint.description = description
    }
    if (type) {
        constraint.type = type
    }
    if (startTime) {
        constraint.startTime = new Date(startTime)
        updateHours(constraint)
    }
    if (endTime) {
        constraint.endTime = new Date(endTime)
        updateHours(constraint)
    }

    res.status(200).json({
        success: true,
        msg: 'Constraint updated',
        data: constraints,
    })
})

// Remove a constraint
app.delete('/api/constraints/:id', (req, res) => {
    const { id } = req.params
    const constraint = constraints.find((constraint) => constraint.id === Number(id))

    if (!constraint) {
        return res
            .status(404)
            .json({ success: false, msg: `No task with id: ${id}` })
    }

    constraints = constraints.filter((constraint) => constraint.id !== Number(id))
    res.status(200).json({
        success: true,
        msg: 'Constraint removed',
        data: constraints,
    })
})

// knapsack solution
app.post('/api/knapsack', (req, res) => {
    const knapsack = req.body as Knapsack
    const solution = solve(knapsack)
    res.status(201).json({ success: true, msg: 'knapsack solution', data: solution })
})

app.listen(PORT, () => {
    console.log(`~ Server is running on port ${PORT}`)
})
