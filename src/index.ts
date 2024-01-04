import { Express, Request, Response } from 'express';
import { UserValidation } from '../resources/UserValidation';
import { UserActions } from '../resources/UserActions';
import { User } from '../resources/interfaces';

const express = require('express');
const app: Express = express();
require('dotenv').config();

app.use(express.json());


const user = new UserActions;
const userValidation = new UserValidation;

//request users data for testing
app.get('/users', (req: Request, res: Response) => {
    res.json(user.users);
})

app.post('/users/register', async (req: Request, res: Response) => {
    const error = userValidation.registerValidation(req.body.email, req.body.password);
    const thereIsError = error != "";
    if (thereIsError) {
        return res.status(400).send(error);
    }
    const emailAlreadyExists = user.getUserByEmail(req.body.email) != undefined;
    if (emailAlreadyExists) {
        return res.status(400).send("Email already in use.");
    }
    try {
        user.register({email: req.body.email, password: req.body.password});
        return res.status(201).send("User created successfully.");
    } catch {
        res.status(500).send();
    }
})

app.post('/users/login', async (req: Request, res: Response) => {
    const currentUser: User | undefined = user.getUserByEmail(req.body.email);
    const error = userValidation.loginValidation(req.body.email, req.body.password);
    const thereIsError = error != ""
    if (thereIsError) {
        return res.status(400).send(error);
    }
    const userDoesNotExist = currentUser === undefined;
    if (userDoesNotExist) {
        return res.status(400).send("User does not exist.");
    }
    try {
        if (await user.login(currentUser, req.body.password)) {
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