import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import auth from './routes/auth';
import tweets from './routes/tweets';
import members from './routes/members';
import path from 'path';


const app = express();

const corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200, // For legacy browser support
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use('/images', express.static(path.join('images')));

app.use('/api/auth', auth)
app.use('/api/tweets', tweets);
app.use('/api/members', members);

export default app;