import { Transporter, SentMessageInfo } from "nodemailer";
import dotenv from 'dotenv'; dotenv.config();

export class UserEmailConfirmation {
   
    private transporter: Transporter;
    
    constructor(transporter: Transporter) {
        this.transporter = transporter
    }
    
    public sendRegistrationEmail(email: string): void {
        
        const mailOptions = {
            from: process.env.ORG_EMAIL,
            to: email,
            subject: 'Registration Successful',
            text: 'Congratulations! You have successfully registered.'
        };

        this.transporter.sendMail(mailOptions, (error: Error | null, info: SentMessageInfo) => {
            if (error) {
                console.error('Error sending email:', error);
                return;
            }
            console.log('Email sent:', info.response);
        });
    }
}