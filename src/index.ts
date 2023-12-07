import { Express, Request, Response } from 'express';
import { UserValidation } from '../resources/UserValidation';

const express = require('express');
const app: Express = express();
require('dotenv').config();

app.use(express.json());

const user = new UserValidation;

//request users data for testing
app.get('/users', (req: Request, res: Response) => {
    res.json(user.users);
})

app.post('/users', async (req: Request, res: Response) => {
    const error = user.registerValidation(req.body.email, req.body.password);
    const thereIsError = error != "";
    if (thereIsError) {
        return res.status(400).send(error);
    }
    try {
        user.register(req.body.email, await user.hashPassword(req.body.password));
        return res.status(201).send("User created successfully.");
    } catch {
        res.status(500).send();
    }
})

app.post('/users/login', async (req: Request, res: Response) => {
    const error = user.loginValidation(req.body.email, req.body.password);
    const thereIsError = error != "";
    if (thereIsError) {
        return res.status(400).send(error);
    }
    try {
        if (await user.login(req.body.email, req.body.password)) {
            return res.send("Logged in successfully.");
        }
        return res.status(401).send("Incorrect password.");
    } catch {
        res.status(500).send()
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.HOST}: ${process.env.PORT}`);
})