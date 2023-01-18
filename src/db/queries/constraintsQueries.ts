import pool from '../connection'
import { v4 as uuid } from 'uuid'

export async function getConstraint(id: string) {
    try {
        const constraint = await pool.query(
            'SELECT * FROM constraints WHERE id = $1',
            [id]
        )
        return constraint.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function getCalendarConstraints(calendar_id: string) {
    try {
        const calendarConstraints = await pool.query(
            'SELECT * FROM constraints WHERE calendar_id = $1',
            [calendar_id]
        )
        return calendarConstraints.rows
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function getDayConstraints(calendar_id: string, date: Date) {
    try {
        const dayConstraints = await pool.query(
            `SELECT * FROM constraints WHERE
            calendar_id = $1
            AND
            (date_trunc('day', start_time) <= $2 AND date_trunc('day', end_time) >= $2)`,
            [calendar_id, date]
        )
        return dayConstraints.rows
    } catch (error) {
        console.error(error.message)
    }
}

export async function createConstraint(input: any) {
    try {
        const { calendar_id, description, start_time, end_time, type } = input

        const newConstraint = await pool.query(
            'INSERT INTO constraints (id, calendar_id, description, start_time, end_time, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [uuid(), calendar_id, description, start_time, end_time, type]
        )
        return newConstraint.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function updateConstraint(input: any) {
    try {
        const { id, description, start_time, end_time, type } = input

        if (description) {
            await pool.query(
                'UPDATE constraints SET description = $1 WHERE id = $2',
                [description, id]
            )
        }

        if (start_time) {
            await pool.query(
                'UPDATE constraints SET start_time = $1 WHERE id = $2',
                [start_time, id]
            )
        }

        if (end_time) {
            await pool.query('UPDATE constraints SET end_time = $1 WHERE id = $2', [
                end_time,
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
        return updatedConstraint.rows[0]
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
        return deletedConstraint.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}
