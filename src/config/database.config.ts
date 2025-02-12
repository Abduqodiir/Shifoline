export const databaseConfig = () => ({
    databaseConfig: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        dbname: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER
    }
})