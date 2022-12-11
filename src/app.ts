import express from 'express'
import pool from './db'
import logger from './modules/Logger'

import Task from './modules/Task'
import Constraint from './modules/Constraint'
import Day from './modules/Day'
import optimization from './optimization'

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(logger)

let calendar: Day[] = Day.generateCalendar(5)

let tasks: Task[] = new Array<Task>()
let constraints: Constraint[] = new Array<Constraint>()

// ============================== Tasks ==============================

// Get all the tasks
app.get('/api/tasks', (req, res) => {
    res.status(200).json({ success: true, msg: 'Tasks List', data: tasks })
})

// Get a task by ID
app.get('/api/tasks/:id', (req, res) => {
    const { id } = req.params
    const task = tasks.find((task) => task.id === id)

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

    const task: Task = new Task(description, new Date(deadline), hours)

    task.updateDetails(new Date())
    tasks.push(task)

    return res.status(201).json({ success: true, msg: 'Task Created', data: tasks })
})

// Update a task
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params
    const task = tasks.find((task) => task.id === id)

    if (!task) {
        return res
            .status(404)
            .json({ success: false, msg: `No task with id: ${id}` })
    }

    const { description, deadline, hours } = req.body

    if (description) {
        task.setDescription = description
    }
    if (deadline) {
        task.setDeadline = deadline
    }
    if (hours) {
        task.setHours = hours
    }

    task.updateDetails(new Date())

    res.status(200).json({ success: true, msg: 'Task updated', data: tasks })
})

// Remove a task
app.delete('/api/tasks/:id', (req, res) => {
    console.log('delete')

    const { id } = req.params
    const task = tasks.find((task) => task.id === id)

    if (!task) {
        return res
            .status(404)
            .json({ success: false, msg: `No task with id: ${id}` })
    }

    tasks = tasks.filter((task) => task.id !== id)
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
    const constraint = constraints.find((constraint) => constraint.id === id)

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
    const { description, type, start, end } = req.body

    // Make sure that the basic parameters was provided
    if (!description || !type || !start || !end) {
        return res
            .status(404)
            .json({ success: false, msg: 'Please provide a legal constraint' })
    }

    const constraint: Constraint = new Constraint(
        description,
        type,
        new Date(start),
        new Date(end)
    )

    constraint.updateHours()
    constraints.push(constraint)

    return res
        .status(201)
        .json({ success: true, msg: 'Constraint Created', data: constraints })
})

// Update a constraint
app.put('/api/constraints/:id', (req, res) => {
    const { id } = req.params
    const constraint = constraints.find((constraint) => constraint.id === id)

    if (!constraint) {
        return res
            .status(404)
            .json({ success: false, msg: `No constraint with id: ${id}` })
    }

    const { description, type, start, end } = req.body

    if (description) {
        constraint.setDescription = description
    }
    if (type) {
        constraint.type = type
    }
    if (start) {
        constraint.setStart = new Date(start)
        constraint.updateHours()
    }
    if (end) {
        constraint.setEnd = new Date(end)
        constraint.updateHours()
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
    const constraint = constraints.find((constraint) => constraint.id === id)

    if (!constraint) {
        return res
            .status(404)
            .json({ success: false, msg: `No task with id: ${id}` })
    }

    constraints = constraints.filter((constraint) => constraint.id !== id)
    res.status(200).json({
        success: true,
        msg: 'Constraint removed',
        data: constraints,
    })
})

// Performing optimization
app.get('/api/optimization', (req, res) => {
    optimization(calendar, tasks)

    res.status(200).json({
        success: true,
        msg: 'Successfully optimized',
        data: {
            Calendar: calendar,
            allTasks: tasks,
        },
    })
})

app.listen(PORT, () => {
    console.log(`~ Server is running on port ${PORT}`)
})
