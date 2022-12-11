import pg from 'pg'

const pool = new pg.Pool({
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'no_stress',
})

export default pool
