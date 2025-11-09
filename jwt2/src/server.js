import express from 'express';
import cors from 'cors';
import { env } from './utils/env.js';
import authRouter from './routes/auth.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'JWT Lab API is running' });
});

app.use('/api/auth', authRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(env.PORT, () => {
  console.log(`Server listening on http://localhost:${env.PORT}`);
});
