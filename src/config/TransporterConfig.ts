import { Transporter } from "nodemailer";
const nodemailer = require('nodemailer');

export class TransporterConfig {
    public transporter: Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.ORG_EMAIL,
                pass: process.env.ORG_PASSWORD
            }
        });
    }
}