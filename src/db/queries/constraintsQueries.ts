import pool from '../connection'

export async function getAllConstraints() {
    try {
        const constraints = await pool.query('SELECT * FROM constraints')
        return constraints.rows
    } catch (error: any) {
        console.error(error.message)
    }
}

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

export async function getUserConstraints(user_id: string) {
    try {
        const userConstraints = await pool.query(
            'SELECT * FROM constraints WHERE user_id = $1',
            [user_id]
        )
        return userConstraints.rows
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

export async function createConstraint(input: any) {
    try {
        const newConstraint = await pool.query(
            'INSERT INTO constraints (user_id, calendar_id, description, type, start_time, end_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [
                input.user_id,
                input.calendar_id,
                input.description,
                input.type,
                input.start_time,
                input.end_time,
            ]
        )
        return newConstraint.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function updateConstraint(input: any) {
    try {
        const { id } = input

        if (input.description) {
            await pool.query(
                'UPDATE constraints SET description = $1 WHERE id = $2',
                [input.description, id]
            )
        }

        if (input.type) {
            await pool.query('UPDATE constraints SET type = $1 WHERE id = $2', [
                input.type,
                id,
            ])
        }

        if (input.start_time) {
            await pool.query(
                'UPDATE constraints SET start_time = $1 WHERE id = $2',
                [input.start_time, id]
            )
        }

        if (input.end_time) {
            await pool.query('UPDATE constraints SET end_time = $1 WHERE id = $2', [
                input.end_time,
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
