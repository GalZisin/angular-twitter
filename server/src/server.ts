import app from './app';
import connectDatabase from './database';
import dotenv from 'dotenv';

//Handle Uncaught exceptions
process.on('unhandledException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shuting down due to uncaught exception');
    process.exit(1);
})

//Setting up config files
dotenv.config({ path: './config.env' });

//Connecting to Database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

//Handle Unhandled Promis rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1);
    })
})