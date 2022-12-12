import pool from '../connection'

export async function getAllUsers() {
    try {
        const allUsers = await pool.query('SELECT * FROM users')
        return allUsers.rows
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function getUser(id: String) {
    try {
        const user = await pool.query('SELECT * FROM users WHERE (id=$1)', [id])
        return user.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function createUser(userInput: any) {
    try {
        const user = await pool.query(
            'INSERT INTO users (first_name, last_name, birthday, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [
                userInput.first_name,
                userInput.last_name,
                userInput.birthday,
                userInput.username,
                userInput.password,
            ]
        )
        return user.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}
