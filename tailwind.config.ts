import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/components/[object Object].js",
    ],
    theme: {
        extend: {
            transitionTimingFunction: {
                custom: "cubic-bezier(0.77,0.2,0.05,1.0)",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            textUnderlineOffset: {
                "3": "3px",
                "4": "4px",
            },
        },
    },
    plugins: [nextui()],
};
export default config;
