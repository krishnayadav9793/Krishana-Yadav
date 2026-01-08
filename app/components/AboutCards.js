"use client";
import { CardStack } from "../../components/ui/card-stack";
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
export function CardStackDemo() {
    return (
        <div className=" flex items-center justify-center w-full mt-24 ">
            <CardStack items={CARDS} />
        </div>
    );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
    children,
    className
}) => {
    return (
        <span
            className={cn(
                "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
                className
            )}>
            {children}
        </span>
    );
};

const CARDS = [
    {
        id: 0,
        content: (
            <TextGenerateEffect words={"I love turning ideas into reality using code and continuously improving my skills by learning new technologies and working on real-world projects."} />
        ),
    },
    {
        id: 1,
        content: (
            <TextGenerateEffect words={"Alongside this, I work on Web Development and App Development, building responsive, user-friendly, and scalable applications."} />
        ),
    },
    {
        id: 2,
        content: (
            <TextGenerateEffect words={"I actively practice Competitive Programming, which has strengthened my logical thinking and algorithmic skills."} />
        ),
    },
    {
        id: 3,

        content: (
            <TextGenerateEffect words={"I completed my schooling from Kendriya Vidyalaya Azamgrah , where my interest in technology and problem-solving began."} />
        ),
    },
    {
        id: 4,
        content: (
            <TextGenerateEffect words={"Hi, I’m Krishana Yadav, a passionate developer currently pursuing Computer Science at Indian Institute of Information Technology Vadodara(IIITV)."} />
        ),
    },



];
