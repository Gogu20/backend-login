import { Express, Request, Response } from 'express';
import { User, UserInput, ValidationResult } from '../resources/sharedTypes'
import { isUser } from '../resources/typeUtils';
import { UserValidation } from '../resources/UserValidation';
import { UserActions } from '../resources/UserActions';
import { UserData } from '../resources/UserData';
import { bundleErrorsFromArray } from '../resources/generalUtils';


const express = require('express');
const app: Express = express();
require('dotenv').config();

app.use(express.json());

const userData = new UserData;
const userActions = new UserActions(userData);
const userValidation = new UserValidation();

//request users data for testing
app.get('/users', (req: Request, res: Response) => {
    res.json(userData.users);
})

app.post('/users/register', async (req: Request, res: Response) => {
    const userInputData: UserInput = {
        email: req.body.email,
        password: req.body.password
    }
    const currentUser: User | undefined = userData.getUserByEmail(userInputData.email);
    const userAlreadyExists = isUser(currentUser);
    if (userAlreadyExists) {
        return res.status(409).send("Email already in use.");
    }

    const validationResults: ValidationResult = userValidation.registerValidation(userInputData);
    const thereIsError: boolean = !validationResults.success;
    const validationErrors = bundleErrorsFromArray(validationResults.errors as string[])
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
    const thereIsError: boolean = !validationResults.success;
    if (thereIsError) {
        return res.status(400).send(validationResults.errors);
    }
    const currentUser: User | undefined = userData.getUserByEmail(userInputData.email);
    const userDoesNotExists = !isUser(currentUser);
    if (userDoesNotExists) {
        return res.status(404).send("User does not exist.");
    }

    try {
        if (await userActions.login(currentUser, userInputData.password)) {
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