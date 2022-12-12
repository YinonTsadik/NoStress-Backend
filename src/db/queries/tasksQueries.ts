import pool from '../connection'

export async function getAllTasks() {
    try {
        const allTasks = await pool.query('SELECT * FROM tasks')
        return allTasks.rows
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function getTask(id: String) {
    try {
        const task = await pool.query('SELECT * FROM tasks WHERE(id=$1)', [id])
        return task.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function createTask(taskInput: any) {
    try {
        const task = await pool.query(
            'INSERT INTO tasks (user_id, description, deadline, hours) VALUES ($1, $2, $3, $4) RETURNING *',
            [
                taskInput.user_id,
                taskInput.description,
                taskInput.deadline,
                taskInput.hours,
            ]
        )
        return task.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}
