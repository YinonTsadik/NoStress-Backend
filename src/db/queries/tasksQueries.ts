import pool from '../connection'
import { v4 as uuid } from 'uuid'

export async function getTask(id: string) {
    try {
        const task = await pool.query('SELECT * FROM tasks WHERE id = $1', [id])
        return task.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function getCalendarTasks(calendar_id: string) {
    try {
        const calendarTasks = await pool.query(
            'SELECT * FROM tasks WHERE calendar_id = $1',
            [calendar_id]
        )
        return calendarTasks.rows
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function createTask(input: any) {
    try {
        const newTask = await pool.query(
            'INSERT INTO tasks (id, calendar_id, description, deadline, work_hours) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [
                uuid(),
                input.calendar_id,
                input.description,
                input.deadline,
                input.work_hours,
            ]
        )
        return newTask.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function updateTask(input: any) {
    try {
        const { id } = input

        if (input.description) {
            await pool.query('UPDATE tasks SET description = $1 WHERE id = $2', [
                input.description,
                id,
            ])
        }

        if (input.deadline) {
            await pool.query('UPDATE tasks SET deadline = $1 WHERE id = $2', [
                input.deadline,
                id,
            ])
        }

        if (input.work_hours) {
            await pool.query('UPDATE tasks SET work_hours = $1 WHERE id = $2', [
                input.work_hours,
                id,
            ])
        }

        const updatedTask = await pool.query('SELECT * FROM tasks WHERE id = $1', [
            id,
        ])
        return updatedTask.rows[0]
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
        return deletedTask.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}
