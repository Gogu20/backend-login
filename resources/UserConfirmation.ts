import { Transporter, SentMessageInfo } from "nodemailer";
const nodemailer = require('nodemailer');
require('dotenv').config();

export class UserConfirmation {
   
    private transporter: Transporter;
    
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.ORG_EMAIL,
                pass: process.env.ORG_PASSWORD
            }
        });
    }

    public sendRegistrationEmail(email: string) {

        const mailOptions = {
            from: process.env.ORG_EMAIL,
            to: email,
            subject: 'Registration Successful',
            text: 'Congratulations! You have successfully registered.'
        };

        this.transporter.sendMail(mailOptions, function (error: Error | null, info: SentMessageInfo) {
            if (error) {
                console.error('Error sending email:', error);
                return;
            }
            console.log('Email sent: ' + info.response);
        });
    }
}