import { Express, Request, Response } from 'express';

import { login } from '../utils/login';
import { register } from '../utils/register';
import { users } from '../utils/users';
import { loginValidation, registerValidation } from '../utils/validation-utils';

const express = require('express');
const app: Express = express();
require('dotenv').config();

app.use(express.json());

app.get('/users', (req: Request, res: Response) => {
    res.json(users);
}) //request users data for testing

app.post('/users', async (req: Request, res: Response) => {
    const error = registerValidation(req.body.email, req.body.password);
    const thereIsError = error != "";
    if (thereIsError) {
        return res.status(400).send(error);
    }
    try {
        await register(req.body.email, req.body.password);
        return res.status(201).send("User created successfully.");
    } catch {
        res.status(500).send();
    }
})

app.post('/users/login', async (req: Request, res: Response) => {
    const error = loginValidation(req.body.email, req.body.password);
    const thereIsError = error != "";
    if (thereIsError) {
        return res.status(400).send(error);
    }
    try {
        if (await login(req.body.email, req.body.password)) {
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