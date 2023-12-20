import { Express, Request, Response } from 'express';
import { User } from '../resources/interfaces';
import { UserValidation } from '../resources/UserValidation';
import { UserActions } from '../resources/UserActions';

const express = require('express');
const app: Express = express();
require('dotenv').config();

app.use(express.json());

const users: User[] = [];
const userActions = new UserActions;
const userValidation = new UserValidation;

//request users data for testing
app.get('/users', (req: Request, res: Response) => {
    res.json(users);
})

app.post('/users', async (req: Request, res: Response) => {
    const {error, currentUser} = userValidation.registerValidation(req.body.email, req.body.password);
    if (currentUser === undefined) {
        return res.status(400).send(error);
    }
    try {
        userActions.register(currentUser);
        return res.status(201).send("User created successfully.");
    } catch {
        res.status(500).send();
    }
})

app.post('/users/login', async (req: Request, res: Response) => {
    const {error, currentUser} = userValidation.loginValidation(req.body.email, req.body.password);
    if (currentUser === undefined) {
        return res.status(400).send(error);
    }
    try {
        if (await userActions.login(currentUser, req.body.password)) {
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