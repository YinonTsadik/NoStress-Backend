import pool from '../connection'

export async function getAllTasks() {
    try {
        const tasks = await pool.query('SELECT * FROM tasks')
        return tasks.rows
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function getUserTasks(user_id: string) {
    try {
        const userTasks = await pool.query(
            'SELECT * FROM tasks WHERE user_id = $1',
            [user_id]
        )
        return userTasks.rows
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function getTask(id: string) {
    try {
        const task = await pool.query('SELECT * FROM tasks WHERE id = $1', [id])
        return task.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function createTask(input: any) {
    try {
        const task = await pool.query(
            'INSERT INTO tasks (user_id, description, deadline, hours) VALUES ($1, $2, $3, $4) RETURNING *',
            [input.user_id, input.description, input.deadline, input.hours]
        )
        return task.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function updateTask(input: any) {
    try {
        const { id } = input

        if (input.description) {
            await pool.query('UPDATE tasks SET description = $1 WHERE id = $2', [
                input.description,
                id,
            ])
        }

        if (input.deadline) {
            await pool.query('UPDATE tasks SET deadline = $1 WHERE id = $2', [
                input.deadline,
                id,
            ])
        }

        if (input.hours) {
            await pool.query('UPDATE tasks SET hours = $1 WHERE id = $2', [
                input.hours,
                id,
            ])
        }

        if (input.start_time) {
            await pool.query('UPDATE tasks SET start_time = $1 WHERE id = $2', [
                input.start_time,
                id,
            ])
        }

        if (input.end_time) {
            await pool.query('UPDATE tasks SET end_time = $1 WHERE id = $2', [
                input.end_time,
                id,
            ])
        }

        const newTask = await pool.query('SELECT * FROM tasks WHERE id = $1', [id])
        return newTask.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}

export async function deleteTask(id: string) {
    try {
        const deletedTask = await pool.query(
            'DELETE FROM tasks WHERE id = $1 RETURNING *',
            [id]
        )
        console.log(deletedTask.rows)
        return deletedTask.rows[0]
    } catch (error: any) {
        console.error(error.message)
    }
}
