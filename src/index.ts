import { Express, Request, Response } from 'express';
import { User, UserInput, ValidationResult } from './sharedTypes'
import { bundleErrorsFromArray } from './utils/generalUtils'
import { UserValidation } from './user/UserValidation';
import { UserActions } from './user/UserActions';
import { UserData } from './user/UserData';

const express = require('express');
const app: Express = express();
require('dotenv').config();

app.use(express.json());

const userData = new UserData;
const userActions = new UserActions(userData);
const userValidation = new UserValidation;

//request users data for testing
app.get('/users', (req: Request, res: Response) => {
    res.json(userData.users);
})

app.post('/users/register', async (req: Request, res: Response) => {
    const userInputData: UserInput = {
        email: req.body.email,
        password: req.body.password
    }
    const userAlreadyExists: User | undefined = userData.getUserByEmail(userInputData.email);
    if (userAlreadyExists) {
        return res.status(409).send("Email already in use.");
    }

    const validationResults: ValidationResult = userValidation.registerValidation(userInputData);
    const validationErrors: string | undefined = bundleErrorsFromArray(validationResults.errors)
    const thereIsError: boolean = !validationResults.success;
    if (thereIsError) {
        return res.status(400).send(validationErrors);
    }

    try {
        userActions.register({
            id: Date.now(),
            email: userInputData.email,
            password: userInputData.password,
        });
        return res.status(201).send("User created successfully.");
    } catch {
        res.status(500).send();
    }
})

app.post('/users/login', async (req: Request, res: Response) => {
    const userInputData: UserInput = {
        email: req.body.email,
        password: req.body.password
    }
    const validationResults: ValidationResult = userValidation.loginValidation(userInputData);
    const validationErrors: string | undefined = bundleErrorsFromArray(validationResults.errors)
    const thereIsError: boolean = !validationResults.success;
    if (thereIsError) {
        return res.status(400).send(validationErrors);
    }
    const userDoesExists: User | undefined = userData.getUserByEmail(userInputData.email);
    if (!userDoesExists) {
        return res.status(404).send("User does not exist.");
    }

    try {
        if (await userActions.login(userDoesExists, userInputData.password)) {
            return res.status(200).send("Logged in successfully.");
        }
        return res.status(401).send("Incorrect password.");
    } catch {
        res.status(500).send()
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.HOST}: ${process.env.PORT}`);
})