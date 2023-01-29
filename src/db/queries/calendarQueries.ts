import pool from '../connection'
import { v4 as uuid } from 'uuid'
import { Calendar, CreateCalendar, UpdateCalendar } from '../interfaces/Calendar'
import { Event } from '../interfaces/Event'

export async function getCalendar(id: string) {
    try {
        const calendar = await pool.query('SELECT * FROM calendars WHERE id = $1', [
            id,
        ])
        return calendarAsInterface(calendar.rows[0])
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function getUserCalendars(userID: string) {
    try {
        const userCalendars = await pool.query(
            'SELECT * FROM calendars WHERE user_id = $1',
            [userID]
        )
        return userCalendars.rows.map((userCalendar) =>
            calendarAsInterface(userCalendar)
        )
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function createCalendar(input: CreateCalendar) {
    try {
        const { userID, name, startDate, endDate } = input

        const newCalendar = await pool.query(
            'INSERT INTO calendars (id, user_id, name, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [uuid(), userID, name, startDate, endDate]
        )
        return calendarAsInterface(newCalendar.rows[0])
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function getCalendarEvents(calendarID: string) {
    try {
        const calendarEvents = await pool.query(
            `SELECT 
            COALESCE(c.id, st.id) AS id, 
            COALESCE(c.description, t.description) AS description,
            COALESCE(c.start_time, st.start_time) AS start_time, 
            COALESCE(c.end_time, st.end_time) AS end_time
            FROM constraints as c
            FULL OUTER JOIN scheduled_tasks as st
            ON c.calendar_id = st.calendar_id
            LEFT JOIN tasks as t ON st.task_id = t.id
            WHERE c.calendar_id = $1 OR st.calendar_id = $1`,
            [calendarID]
        )
        return calendarEvents.rows.map((calendarEvent) =>
            eventAsInterface(calendarEvent)
        )
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function updateCalendar(input: UpdateCalendar) {
    try {
        const { id, name, startDate, endDate } = input

        if (name) {
            await pool.query('UPDATE calendars SET name = $1 WHERE id = $2', [
                name,
                id,
            ])
        }

        /*
            Add:
            Deleting the tasks, constraints and scheduledTasks that
            are not in the new date range after updating the dates.
        */

        if (startDate) {
            await pool.query('UPDATE calendars SET start_date = $1 WHERE id = $2', [
                startDate,
                id,
            ])
        }

        if (endDate) {
            await pool.query('UPDATE calendars SET end_date = $1 WHERE id = $2', [
                endDate,
                id,
            ])
        }

        const updatedCalendar = await pool.query(
            'SELECT * FROM calendars WHERE id = $1',
            [id]
        )
        return calendarAsInterface(updatedCalendar.rows[0])
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function deleteCalendar(id: string) {
    try {
        await pool.query('DELETE FROM scheduled_tasks WHERE calendar_id = $1', [id])
        await pool.query('DELETE FROM tasks WHERE calendar_id = $1', [id])
        await pool.query('DELETE FROM constraints WHERE calendar_id = $1', [id])

        const deletedCalendar = await pool.query(
            'DELETE FROM calendars WHERE id = $1 RETURNING *',
            [id]
        )
        return calendarAsInterface(deletedCalendar.rows[0])
    } catch (error: any) {
        console.error(error.message)
    }
}

function calendarAsInterface(dbCalendar: any) {
    const calendar: Calendar = {
        id: dbCalendar.id,
        userID: dbCalendar.user_id,
        name: dbCalendar.name,
        startDate: new Date(dbCalendar.start_date),
        endDate: new Date(dbCalendar.end_date),
    }
    return calendar
}

function eventAsInterface(dbEvent: any) {
    const event: Event = {
        id: dbEvent.id,
        description: dbEvent.description,
        startTime: dbEvent.start_time,
        endTime: dbEvent.end_time,
    }
    return event
}
