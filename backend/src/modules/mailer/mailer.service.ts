import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

@Injectable()
export class MailerService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.your-email-provider.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_EMAIL_PASS,
            },
        });
    }

    async sendMail(name: string, email: string, subject: string, otp: string): Promise<void> {
        try {
            const htmlMessage = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #4CAF50;">Your App</h1>
                        <p style="font-size: 16px; color: #555;">Secure your account with this OTP</p>
                    </div>
                    <div style="text-align: center; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
                        <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">Your OTP Code</h2>
                        <p style="font-size: 28px; font-weight: bold; color: #4CAF50; margin: 0;">${otp}</p>
                    </div>
                    <div style="margin-top: 20px; text-align: center; color: #777;">
                        <p style="font-size: 14px;">This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
                    </div>
                    <div style="margin-top: 20px; text-align: center; font-size: 14px; color: #aaa;">
                        <p>If you did not request this OTP, please ignore this email.</p>
                        <p style="margin-top: 10px;">&copy; 2025 Your App. All rights reserved.</p>
                    </div>
                </div>
            `;

            await this.transporter.sendMail({
                from: `"Your App" <${process.env.USER_EMAIL}>`, // Display name and email
                to: email, // Recipient email
                subject: subject, // Email subject
                html: htmlMessage, // Email body (HTML)
            });

            console.log(`Email sent successfully to ${email}`);
        } catch (error) {
            console.error('Error sending email:', error.message);
            throw new Error('Failed to send email. Please try again later.');
        }
    }
}
