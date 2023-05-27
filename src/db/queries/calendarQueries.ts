import pool from '../connection'
import { v4 as uuid } from 'uuid'
import { Calendar, CreateCalendar, UpdateCalendar } from '../interfaces/Calendar'
import { Event } from '../interfaces/Event'

export const getCalendar = async (id: string) => {
    try {
        const calendar = await pool.query('SELECT * FROM calendars WHERE id = $1', [
            id,
        ])
        return calendarAsInterface(calendar.rows[0])
    } catch (error: any) {
        console.error(error.message)
    }
}

export const getUserCalendars = async (userID: string) => {
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

export const createCalendar = async (input: CreateCalendar) => {
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

export const getCalendarEvents = async (calendarID: string) => {
    try {
        const calendarEvents = await pool.query(
            `SELECT
                c.id,
                c.description,
                c.start_time,
                c.end_time
            FROM
                constraints AS c
            WHERE
                c.calendar_id = $1

            UNION ALL

            SELECT
                st.id,
                t.description,
                st.start_time,
                st.end_time
            FROM
                scheduled_tasks AS st
            JOIN
                tasks AS t ON st.task_id = t.id
            WHERE
                st.calendar_id = $1
            `,
            [calendarID]
        )
        return calendarEvents.rows.map((calendarEvent) =>
            eventAsInterface(calendarEvent)
        )
    } catch (error: any) {
        console.error(error.message)
    }
}

export const updateCalendar = async (input: UpdateCalendar) => {
    try {
        const { id, name, startDate, endDate } = input

        if (name) {
            await pool.query('UPDATE calendars SET name = $1 WHERE id = $2', [
                name,
                id,
            ])
        }

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

export const deleteCalendar = async (id: string) => {
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

const calendarAsInterface = (dbCalendar: any) => {
    const calendar: Calendar = {
        id: dbCalendar.id,
        userID: dbCalendar.user_id,
        name: dbCalendar.name,
        startDate: new Date(dbCalendar.start_date),
        endDate: new Date(dbCalendar.end_date),
    }
    return calendar
}

const eventAsInterface = (dbEvent: any) => {
    const event: Event = {
        id: dbEvent.id,
        description: dbEvent.description,
        startTime: dbEvent.start_time,
        endTime: dbEvent.end_time,
    }
    return event
}
