import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [],
  theme: {
    colors: {
      black: "#333333",
      blue: "#1E90FF",
      gray: "#EBEDEF",
      limeGreen: "#ADFF2F",
      skyBlue: "#65A5C9",
      white: "#FFFFFF",
    },
  },
}
export default config
