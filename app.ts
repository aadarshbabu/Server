import express from 'express'
import dotenv from 'dotenv';
import ExpressApp from "./ExpressInit/ExpressInit";
import { Server } from "http";
import { logger } from "./Logger/CreateLogger";
import 'reflect-metadata'
import User from './Controller/userController/userController';
dotenv.config({ path: `${process.cwd()}\\.env.${process.env.ENV}` })
import conn from './Database/dbConfig'; // connection is a function which return a object, and in this object call the method to connect the 'db'

conn().MoongooesConnection()// if you can't pass the connection URI the defalut value is env variable.

const port: any = process.env.PORT || 4000

const app = new ExpressApp(port, [
    express.json()
],
    [User]
)


const server: Server = app.start()


process.on("SIGTERM", () => {
    server.close((err) => {
        logger.error(`Server is close ${err}`)
    })
})


