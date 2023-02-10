require('dotenv').config();

// some extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');


const express = require('express');
const connectDB = require('./db/connect');

const app = express();

const authenticateUser = require('./middleware/authentication');

// router
const authRouter = require('./router/auth');
const jobRouter = require('./router/job');

// error handler
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require("./middleware/error-handler");

const port = process.env.PORT || 1000;

// app.set('trust-proxy', 1);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimiter({windowMs: 60 * 1000, max: 60}));

// routes
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/job",authenticateUser,jobRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);


const start = async(req,res)=>{
    try {
        connectDB(process.env.MONGODB_URI);
        return app.listen(port,()=>{
            console.log(`server running port no ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};
start();