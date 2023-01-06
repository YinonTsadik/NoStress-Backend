import pool from '../connection'
import { v4 as uuid } from 'uuid'

export async function getCalendars() {
    try {
        const allCalendars = await pool.query('SELECT * FROM calendars')
        return allCalendars.rows
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function getCalendar(id: string) {
    try {
        const calendar = await pool.query('SELECT * FROM calendars WHERE id = $1', [
            id,
        ])
        return calendar.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function createCalendar(input: any) {
    try {
        const newCalendar = await pool.query(
            'INSERT INTO calendars (id, user_id, name, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [uuid(), input.user_id, input.name, input.start_date, input.end_date]
        )
        return newCalendar.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function updateCalendar(input: any) {
    try {
        const { id } = input

        if (input.name) {
            await pool.query('UPDATE calendars SET name = $1 WHERE id = $2', [
                input.name,
                id,
            ])
        }

        if (input.start_time) {
            await pool.query('UPDATE calendars SET start_time = $1 WHERE id = $2', [
                input.start_time,
                id,
            ])
        }

        if (input.end_time) {
            await pool.query('UPDATE calendars SET end_time = $1 WHERE id = $2', [
                input.end_time,
                id,
            ])
        }

        const updatedCalendar = await pool.query(
            'SELECT * FROM calendars WHERE id = $1',
            [id]
        )
        return updatedCalendar.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function deleteCalendar(id: string) {
    try {
        await pool.query('DELETE FROM tasks WHERE calendar_id = $1', [id])
        await pool.query('DELETE FROM constraints WHERE calendar_id = $1', [id])
        await pool.query('DELETE FROM scheduled_tasks WHERE calendar_id = $1', [id])
        const deletedCalendar = await pool.query(
            'DELETE FROM calendars WHERE id = $1 RETURNING *',
            [id]
        )
        return deletedCalendar.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}
