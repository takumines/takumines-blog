import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [],
  theme: {
    colors: {
      black: "#01233B",
      blueGray: "#CEDAE2",
      skyBlue: "#65A5C9",
      white: "#FFFFFF",
    },
    extend: {},
  },
}
export default config
