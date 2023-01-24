/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./containers/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'plat': [ 'Rowdies', "cursive", "ui-monospace, Menlo", "Monaco", 'Cascadia Mono', 'Segoe UI Mono',
        'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro',
        'Fira Mono', 'Droid Sans Mono', 'Courier New', "monospace"],
        'explora': [ 'Explora', "cursive", "ui-monospace, Menlo", "Monaco", 'Cascadia Mono', 'Segoe UI Mono']
      },
      colors: {
        primaryText: "#303c3d",
        secondary: "#3bd4e1",
        secondaryLight: "#E8FCFE"
      }
    },
  },
  plugins: [],
}
