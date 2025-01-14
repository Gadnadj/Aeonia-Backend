import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';

const PORT = process.env.PORT || 4000;
const app = express();

//Middlewares
app.use(express.json())
app.use(cors());
await connectDB();


app.get('/', (req, res) => {
    res.send('API Working');
})




app.listen(PORT, () => console.log('Server Running On port ' + PORT));


//gadnadjar
//pYjwUaGZBG7gg7po
//mongodb+srv://gadnadjar:<db_password>@cluster0.rqlnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0