"use client";
import { sendMail } from "@/lib/sendMail";
import {SignupFormDemo} from "../components/inputBox.js";
const sendEmail = async () => {
  await sendMail("karanyadav21398@gmail.com","wese hi","check kar raha hu");
};

export default function Contact() {
  return <div className="min-h-screen justify-center items-center flex bg-neutral-100 dark:bg-neutral-950">
    <SignupFormDemo/>
  </div>
}
