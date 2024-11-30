import nodemailer from 'nodemailer';
import { emailTemplate } from './mailTemplate';

export async function POST(req) {
    try {
        const { name, email, phone, subject, message } = await req.json();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.TO_MAIL_ID,
            subject: `New Contact Form Submission: ${subject}`,
            html: emailTemplate({ name, email, phone, subject, message }),
        };

        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
    }
}
