import { Express, Request, Response } from 'express';
import { UserValidation } from '../resources/UserValidation';
import { UserActions } from '../resources/UserActions';
import { UserData } from '../resources/UserData';
import { User } from '../resources/interfaces'

const express = require('express');
const app: Express = express();
require('dotenv').config();

app.use(express.json());

const userData = new UserData;
const userActions = new UserActions(userData);
const userValidation = new UserValidation(userData);

//request users data for testing
app.get('/users', (req: Request, res: Response) => {
    res.json(userData.users);
})

app.post('/users/register', async (req: Request, res: Response) => {
    const error: string = userValidation.registerValidation(req.body.email, req.body.password);
    const thereIsError: boolean = error != "";
    if (thereIsError) {
        return res.status(400).send(error);
    }
    try {
        userActions.register({email: req.body.email, password: req.body.password});
        return res.status(201).send("User created successfully.");
    } catch {
        res.status(500).send();
    }
})

app.post('/users/login', async (req: Request, res: Response) => {
    const user: User = userData.getUserByEmail(req.body.email);
    const error: string = userValidation.loginValidation(req.body.email, req.body.password);
    const thereIsError: boolean = error != "";
    if (thereIsError) {
        return res.status(400).send(error);
    }
    try {
        if (await userActions.login(user, req.body.password)) {
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