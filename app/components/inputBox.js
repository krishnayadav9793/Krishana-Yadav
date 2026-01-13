"use client";
import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";

import { FloatingDockDemo } from "./floatingFooter";
import { Textarea } from "@/components/ui/textarea";
import { sendMail } from "@/lib/sendMail";
import { Mali } from "next/font/google";
export function SignupFormDemo() {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const [btnText, setButtonText] = useState("Send");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setButtonText("Sending...")
            
            const mail = document.getElementById("email").value
            const massage = document.getElementById("firstname").value + " " + document.getElementById("lastname").value + "\n" + 
            +"Gmail:" + mail + "\n" +document.getElementById("text").value
            const sub = "Response from website"
            const data = { toMail: "karanyadav21398@gmail.com", subject: sub, massage: massage }
            const res = await fetch("/api/send-mail", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(data),
            })
            const data1 = { toMail: mail, subject: "Thank you for Response", massage: "Thank you for Response." }
            const res1 = await fetch("/api/send-mail", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(data1),
            })

            // await sendMail("karanyadav21398@gmail.com", sub, massage);
            // await sendMail(mail, "Thank you for your response", "Thank you for your response")
            // alert("massage sent")
            document.getElementById("form").reset()
            setButtonText("Massage sent!!")
            await sleep(1000)
            setButtonText("Send")
        } catch (e) {
            console.log(e)
            document.getElementById("form").reset()
            setButtonText("Something went wrong!!")
            await sleep(1000)
            setButtonText("Send")
        }

    };
    return (
        <div
            className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                Krishana Yadav
            </h2>
            <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                Fill this form to connect with me
            </p>
            <form className="my-8" id="form" onSubmit={handleSubmit}>
                <div
                    className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                    <LabelInputContainer>
                        <Label htmlFor="firstname">First name</Label>
                        <Input id="firstname" placeholder="Rohit" type="text" />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="lastname">Last name</Label>
                        <Input id="lastname" placeholder="Sharma" type="text" />
                    </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="example@gmail.com" type="email" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="text">Text</Label>
                    <Textarea id="text" placeholder="Write a massage/suggestion for me..." />
                </LabelInputContainer>


                <button
                    className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                    type="submit">
                    {btnText}
                    <BottomGradient />
                </button>

                <div
                    className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
                <FloatingDockDemo />
            </form>
            <p className="text-center">&#xA9; 2025 Krishana Yadav</p>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span
                className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span
                className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};
