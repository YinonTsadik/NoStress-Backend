import pool from '../connection'

export async function getAllConstraints() {
    try {
        const allConstraints = await pool.query('SELECT * FROM constraints')
        return allConstraints.rows
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function getConstraint(id: String) {
    try {
        const constraint = await pool.query(
            'SELECT * FROM constraints WHERE(id=$1)',
            [id]
        )
        return constraint.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function createConstraint(constraintInput: any) {
    try {
        console.log(constraintInput.type)

        const constraint = await pool.query(
            'INSERT INTO constraints (user_id, description, type, start_time, end_time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [
                constraintInput.user_id,
                constraintInput.description,
                constraintInput.type,
                constraintInput.start_time,
                constraintInput.end_time,
            ]
        )
        return constraint.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}
