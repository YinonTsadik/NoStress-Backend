import pool from '../connection'
import { v4 as uuid } from 'uuid'
import { deleteCalendar } from './calendarQueries'

export async function getAllUsernames() {
    try {
        const allUsersNames = await pool.query('SELECT username FROM users')
        return allUsersNames.rows.map((user: any) => user.username)
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function checkAuthDetails(username: string, password: string) {
    try {
        const userID = await pool.query(
            'SELECT id FROM users WHERE username = $1 AND password = $2',
            [username, password]
        )
        return userID.rows[0]?.id || null
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
        const { first_name, last_name, username, password } = input

        const newUser = await pool.query(
            'INSERT INTO users (id, first_name, last_name, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [uuid(), first_name, last_name, username, password]
        )
        return newUser.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function updateUser(input: any) {
    try {
        const { id, first_name, last_name, username, password } = input

        if (first_name) {
            await pool.query('UPDATE users SET first_name = $1 WHERE id = $2', [
                first_name,
                id,
            ])
        }

        if (last_name) {
            await pool.query('UPDATE users SET last_name = $1 WHERE id = $2', [
                last_name,
                id,
            ])
        }

        if (username) {
            await pool.query('UPDATE users SET username = $1 WHERE id = $2', [
                username,
                id,
            ])
        }

        if (password) {
            await pool.query('UPDATE users SET password = $1 WHERE id = $2', [
                password,
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
        const calendarsIDs = await pool.query(
            'SELECT id FROM calendars WHERE user_id = $1',
            [id]
        )
        calendarsIDs?.rows?.forEach((calendar: any) => deleteCalendar(calendar.id))

        const deletedUser = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *',
            [id]
        )
        return deletedUser.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}
