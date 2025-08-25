import express, { type NextFunction, type Request , type Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fileRoutes from './routes/routes';
import { AppError } from './utils/errors';
import { env } from './config/env';
import authRoutes from './routes/auth.routes';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));
app.use(
    cors({
        origin: env.clientUrl || "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Authorization", "Content-Type"],
        credentials: true,
    })
);


app.use('/api/auth',authRoutes)
app.use('/api/private', fileRoutes);

app.use((err: AppError, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || 500;
    res.status(status).json({ message: err.message || 'Server error' });
});


export default app;