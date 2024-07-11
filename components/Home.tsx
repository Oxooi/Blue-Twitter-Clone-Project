"use client";

import { motion } from "framer-motion";
import { TypewriterEffectSmooth } from "./Typewritter";
import { HeroHighlight, Highlight } from "./HeroHighlits";
import { LampContainer } from "./Lamp";

const MainPage = () => {
    const words = [
        {
            text: "Bluebird",
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center h-[40rem]  ">
            <h1 className="text-blue-500 dark:text-blue-500 text-4xl uppercase">
                BlueBird
            </h1>
            <TypewriterEffectSmooth words={words} />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
                    Join now
                </button>
                <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
                    Signup
                </button>
            </div>
        </div>
    );
}

export default MainPage;

export function HeroHighlightDemo() {
    return (
        <HeroHighlight>
            <motion.h1
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: [20, -5, 0],
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1],
                }}
                className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
            >
                With insomnia, nothing&apos;s real. Everything is far away. Everything
                is a{" "}
                <Highlight className="text-black dark:text-white">
                    copy, of a copy, of a copy.
                </Highlight>
            </motion.h1>
        </HeroHighlight>
    );
}


export function LampDemo() {
    return (
        <LampContainer>
            <motion.h1
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
            >
                Build lamps <br /> the right way
            </motion.h1>
        </LampContainer>
    );
}
