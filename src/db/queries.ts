import pool from './connection'

export async function getAllUsers() {
    try {
        const allUsers = await pool.query('SELECT * FROM users')
        return allUsers.rows
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function getAllTasks() {
    try {
        const allTasks = await pool.query('SELECT * FROM tasks')
        return allTasks.rows
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function getAllConstraints() {
    try {
        const allConstraints = await pool.query('SELECT * FROM constraints')
        return allConstraints.rows
    } catch (error: any) {
        console.error(error.message)
    }
}
