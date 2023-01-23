import pool from '../connection'
import { v4 as uuid } from 'uuid'
import { Task, CreateTask, UpdateTask } from '../interfaces'

export async function getCalendarTasks(calendarID: string) {
    try {
        const calendarTasks = await pool.query(
            'SELECT * FROM tasks WHERE calendar_id = $1',
            [calendarID]
        )
        return calendarTasks.rows.map((calendarTask) =>
            taskAsInterface(calendarTask)
        )
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function createTask(input: CreateTask) {
    try {
        const { calendarID, description, deadline, workHours } = input

        const newTask = await pool.query(
            'INSERT INTO tasks (id, calendar_id, description, deadline, work_hours) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [uuid(), calendarID, description, deadline, workHours]
        )
        return taskAsInterface(newTask.rows[0])
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function updateTask(input: UpdateTask) {
    try {
        const { id, description, deadline, workHours } = input

        if (description) {
            await pool.query('UPDATE tasks SET description = $1 WHERE id = $2', [
                description,
                id,
            ])
        }

        if (deadline) {
            await pool.query('UPDATE tasks SET deadline = $1 WHERE id = $2', [
                deadline,
                id,
            ])
        }

        if (workHours) {
            await pool.query('UPDATE tasks SET work_hours = $1 WHERE id = $2', [
                workHours,
                id,
            ])
        }

        const updatedTask = await pool.query('SELECT * FROM tasks WHERE id = $1', [
            id,
        ])
        return taskAsInterface(updatedTask.rows[0])
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function deleteTask(id: string) {
    try {
        const deletedTask = await pool.query(
            'DELETE FROM tasks WHERE id = $1 RETURNING *',
            [id]
        )
        return taskAsInterface(deletedTask.rows[0])
    } catch (error: any) {
        console.error(error.message)
    }
}

function taskAsInterface(dbTask: any) {
    const task: Task = {
        id: dbTask.id,
        calendarID: dbTask.calendar_id,
        description: dbTask.description,
        deadline: new Date(dbTask.deadline),
        workHours: dbTask.work_hours,
    }
    return task
}
