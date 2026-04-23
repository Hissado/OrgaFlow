import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        card: "#FFFFFF",
        primary: "#0F172A",
        accent: "#0EA5E9"
      }
    }
  },
  plugins: []
} satisfies Config;
