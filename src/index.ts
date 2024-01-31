import "reflect-metadata";

import dotenv from 'dotenv'; 
dotenv.config();

import express, { Express, Request, Response } from 'express';
const app: Express = express();

import { IUser, UserInput, ValidationResult } from './sharedTypes';
import { AppDataSource } from "./database/dbConfig";
import { bundleErrorsFromArray } from './utils/formattingUtils';
import { getUserByEmail, getAllUsers } from './utils/queryUtils'
import { UserValidation } from './user/UserValidation';
import { UserActions } from './user/UserActions';

// Middleware
app.use(express.json());

const userActions = new UserActions;
const userValidation = new UserValidation;

app.get('/users', async (req: Request, res: Response) => {
    res.json(await getAllUsers());
})

app.post('/users/register', async (req: Request, res: Response) => {
    const userInputData: UserInput = {
        email: req.body.email,
        password: req.body.password
    }
    const userAlreadyExists: IUser | null = await getUserByEmail(userInputData.email);
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
    const userDoesExists: IUser | null = await getUserByEmail(userInputData.email);
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

await AppDataSource.initialize()
    .then(() => {
        console.log("Connected to mySQL server.");
    })
    .catch((error) => {
        console.log("Unable to connect to mySQL server.");
        throw error;
    });

app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.HOST}: ${process.env.PORT}`);
})