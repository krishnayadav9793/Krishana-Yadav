"use server"
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SEND_MAIL,
        pass: process.env.GOOGLE_APP_PASSWORD, 
    },
});
export const sendMail = async (toMail, subject, massage) => {
    await transporter.sendMail({
        from:process.env.SEND_MAIL,
        to: toMail,
        subject: subject,
        text: massage
    })
} 