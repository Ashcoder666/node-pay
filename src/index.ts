import express, { Express } from "express";
import cors from 'cors'
import helmet from "helmet";
import morgan from 'morgan'
import cookieParse from 'cookie-parser'


const app: Express = express();
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParse());