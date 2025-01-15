import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express();

//Middlewares
app.use(express.json())
app.use(cors());
app.use('/api/user', userRouter);

await connectDB();

app.get('/', (req, res) => {
    res.send('API Working');
})

app.listen(PORT, () => console.log('Server Running On port ' + PORT));
