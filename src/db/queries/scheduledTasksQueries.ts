import pool from '../connection'
import ScheduledTask from '../../modules/ScheduledTask'
import { ScheduledTask as ScheduledTaskInterface } from '../interfaces/ScheduledTask'

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
        return scheduledTaskAsInterface(newScheduledTask.rows[0])
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function deleteCalendarScheduledTasks(calendarID: string) {
    try {
        const numOfDeleted = await pool.query(
            'DELETE FROM scheduled_tasks WHERE calendar_id = $1',
            [calendarID]
        )
        return numOfDeleted.rowCount
    } catch (error: any) {
        console.error(error.message)
    }
}

function scheduledTaskAsInterface(dbScheduledTask: any) {
    const scheduledTask: ScheduledTaskInterface = {
        id: dbScheduledTask.id,
        description: dbScheduledTask.description,
        startTime: new Date(dbScheduledTask.start_time),
        endTime: new Date(dbScheduledTask.end_time),
        hours: dbScheduledTask.hours,
    }
    return scheduledTask
}
