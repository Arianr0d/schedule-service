import pg from 'pg'

export default new pg.Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "ScheduleDB",
})
