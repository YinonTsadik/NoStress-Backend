import pool from '../connection'
import { v4 as uuid } from 'uuid'
import { Constraint, CreateConstraint, UpdateConstraint } from '../interfaces'

export async function getCalendarConstraints(calendarID: string) {
    try {
        const calendarConstraints = await pool.query(
            'SELECT * FROM constraints WHERE calendar_id = $1',
            [calendarID]
        )
        return calendarConstraints.rows.map((calendarConstraint) =>
            constraintAsInterface(calendarConstraint)
        )
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function getDayConstraints(calendarID: string, date: Date) {
    try {
        const dayConstraints = await pool.query(
            `SELECT * FROM constraints WHERE
            calendar_id = $1
            AND
            (date_trunc('day', start_time) <= $2 AND date_trunc('day', end_time) >= $2)`,
            [calendarID, date]
        )
        return dayConstraints.rows.map((dayConstraint) =>
            constraintAsInterface(dayConstraint)
        )
    } catch (error) {
        console.error(error.message)
    }
}

export async function createConstraint(input: CreateConstraint) {
    try {
        const { calendarID, description, startTime, endTime, type } = input

        const newConstraint = await pool.query(
            'INSERT INTO constraints (id, calendar_id, description, start_time, end_time, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [uuid(), calendarID, description, startTime, endTime, type]
        )
        return constraintAsInterface(newConstraint.rows[0])
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function updateConstraint(input: UpdateConstraint) {
    try {
        const { id, description, startTime, endTime, type } = input

        if (description) {
            await pool.query(
                'UPDATE constraints SET description = $1 WHERE id = $2',
                [description, id]
            )
        }

        if (startTime) {
            await pool.query(
                'UPDATE constraints SET start_time = $1 WHERE id = $2',
                [startTime, id]
            )
        }

        if (endTime) {
            await pool.query('UPDATE constraints SET end_time = $1 WHERE id = $2', [
                endTime,
                id,
            ])
        }

        if (type) {
            await pool.query('UPDATE constraints SET type = $1 WHERE id = $2', [
                type,
                id,
            ])
        }

        const updatedConstraint = await pool.query(
            'SELECT * FROM constraints WHERE id = $1',
            [id]
        )
        return constraintAsInterface(updatedConstraint.rows[0])
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function deleteConstraint(id: string) {
    try {
        const deletedConstraint = await pool.query(
            'DELETE FROM constraints WHERE id = $1 RETURNING *',
            [id]
        )
        return constraintAsInterface(deletedConstraint.rows[0])
    } catch (error: any) {
        console.error(error.message)
    }
}

function constraintAsInterface(dbConstraint: any) {
    const constraint: Constraint = {
        id: dbConstraint.id,
        calendarID: dbConstraint.calendar_id,
        description: dbConstraint.description,
        startTime: dbConstraint.start_time,
        endTime: dbConstraint.end_time,
        type: dbConstraint.type,
    }
    return constraint
}
