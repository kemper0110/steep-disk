/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        outbg: "#e5eaf1",
        superlight: "#f5f5f5"
      },
      gridTemplateColumns: {
        entries_template: 'repeat(auto-fill, minmax(150px, 1fr))'
      }
    },
  },
  plugins: [],
}

