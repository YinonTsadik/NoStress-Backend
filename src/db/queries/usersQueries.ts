import pool from '../connection'

export async function getAllUsers() {
    try {
        const allUsers = await pool.query('SELECT * FROM users')
        return allUsers.rows
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function getUser(id: string) {
    try {
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [id])
        return user.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function createUser(input: any) {
    try {
        const newUser = await pool.query(
            'INSERT INTO users (first_name, last_name, username, password, birthday) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [
                input.first_name,
                input.last_name,
                input.username,
                input.password,
                input.birthday,
            ]
        )
        return newUser.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function updateUser(input: any) {
    try {
        const { id } = input

        if (input.first_name) {
            await pool.query('UPDATE users SET first_name = $1 WHERE id = $2', [
                input.first_name,
                id,
            ])
        }

        if (input.last_name) {
            await pool.query('UPDATE users SET last_name = $1 WHERE id = $2', [
                input.last_name,
                id,
            ])
        }

        if (input.username) {
            await pool.query('UPDATE users SET username = $1 WHERE id = $2', [
                input.username,
                id,
            ])
        }

        if (input.password) {
            await pool.query('UPDATE users SET password = $1 WHERE id = $2', [
                input.password,
                id,
            ])
        }

        if (input.birthday) {
            await pool.query('UPDATE users SET birthday = $1 WHERE id = $2', [
                input.birthday,
                id,
            ])
        }

        const updatedUser = await pool.query('SELECT * FROM users WHERE id = $1', [
            id,
        ])
        return updatedUser.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function deleteUser(id: string) {
    try {
        const deletedUser = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *',
            [id]
        )
        return deletedUser.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}
