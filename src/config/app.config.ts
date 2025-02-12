export const appConfig = () => ({
    appConfig: {
        port: parseInt(process.env.PORT) || 3000,
        host: process.env.HOST 
    }
})