import pool from '../connection'
import { v4 as uuid } from 'uuid'
import { User, CreateUser, UpdateUser } from '../interfaces/User'
import { deleteCalendar } from './calendarQueries'

export async function getUsernames() {
    try {
        const allUsersNames = await pool.query('SELECT username FROM users')
        return allUsersNames.rows.map((user) => user.username) as string[]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function getUser(username: string, password: string) {
    try {
        const user = await pool.query(
            'SELECT * FROM users WHERE username = $1 AND password = $2',
            [username, password]
        )

        if (!user.rows[0]) return null
        return userAsInterface(user.rows[0])
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function createUser(input: CreateUser) {
    try {
        const { firstName, lastName, username, password } = input

        const newUser = await pool.query(
            'INSERT INTO users (id, first_name, last_name, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [uuid(), firstName, lastName, username, password]
        )
        return userAsInterface(newUser.rows[0])
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function updateUser(input: UpdateUser) {
    try {
        const { id, firstName, lastName, username, password } = input

        if (firstName) {
            await pool.query('UPDATE users SET first_name = $1 WHERE id = $2', [
                firstName,
                id,
            ])
        }

        if (lastName) {
            await pool.query('UPDATE users SET last_name = $1 WHERE id = $2', [
                lastName,
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
        return userAsInterface(updatedUser.rows[0])
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
        calendarsIDs.rows.forEach((calendar) => deleteCalendar(calendar.id))

        const deletedUser = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *',
            [id]
        )
        return userAsInterface(deletedUser.rows[0])
    } catch (error: any) {
        console.error(error.message)
    }
}

function userAsInterface(dbUser: any) {
    const user: User = {
        id: dbUser.id,
        firstName: dbUser.first_name,
        lastName: dbUser.last_name,
        username: dbUser.username,
        password: dbUser.password,
    }
    return user
}
