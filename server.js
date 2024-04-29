import cors from 'cors';
import dotenv from 'dotenv';
import express from "express";
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import matchesRoutes from "./routes/matchesRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import newscategoryRoutes from "./routes/newscategoryRoutes.js";

//config env
dotenv.config();

//databse config
connectDB();

//rest object
const app= express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/newscategory', newscategoryRoutes);
app.use('/api/v1/match', matchesRoutes);
app.use('/api/v1/news', newsRoutes);

app.get('/',(req,res)=>{
    res.send({
        message:'welcome to cricscore app'
    })
})

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server is running...`.bgCyan.white);
});