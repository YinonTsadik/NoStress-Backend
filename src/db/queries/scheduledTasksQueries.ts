import pool from '../connection'
import ScheduledTask from '../../modules/ScheduledTask'

export async function getScheduledTask(id: string) {
    try {
        const scheduledTask = await pool.query(
            'SELECT * FROM scheduled_tasks WHERE id = $1',
            [id]
        )
        return scheduledTask.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function getCalendarScheduledTasks(calendar_id: string) {
    try {
        const calendarScheduledTasks = await pool.query(
            'SELECT st.id, t.description, st.start_time, st.end_time, st.hours FROM scheduled_tasks AS st LEFT JOIN tasks as t ON st.task_id = t.id WHERE st.calendar_id = $1',
            [calendar_id]
        )
        return calendarScheduledTasks.rows
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function createScheduledTask(input: ScheduledTask) {
    try {
        const newScheduledTask = await pool.query(
            'INSERT INTO scheduled_tasks (id, task_id, calendar_id, start_time, end_time, hours) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [
                input.getID,
                input.getTaskID,
                input.getCalendarID,
                input.getStart,
                input.getEnd,
                input.getHours,
            ]
        )
        return newScheduledTask.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function deleteCalendarScheduledTasks(calendar_id: string) {
    try {
        const numOfDeleted = await pool.query(
            'DELETE FROM scheduled_tasks WHERE calendar_id = $1',
            [calendar_id]
        )
        return numOfDeleted.rowCount
    } catch (error: any) {
        console.error(error.message)
    }
}
