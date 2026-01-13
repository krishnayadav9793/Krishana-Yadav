"use server"
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 465,
  secure: true,
    auth: {
        user: process.env.SEND_MAIL,
        pass: process.env.GOOGLE_APP_PASSWORD, 
    },
});
export const sendMail = async (body) => {
    // console.log(body.toMail+body.massage+body.subject+"from function")
    try{
        await transporter.sendMail({
        from:process.env.SEND_MAIL,
        to: body.toMail,
        subject: body.subject,
        text: body.massage,
        
    })
    }catch(e){
        console.log(e)
    }
    return NextResponse.json({ success: true });
} 