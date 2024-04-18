import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  theme: {
    colors: {
      black: "#01233B",
      "blue-gray": "#CEDAE2",
      "sky-blue": "#65A5C9",
    },
  },
}
export default config
