/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // You can customize your colors here to match the theme
                'primary': '#14B8A6', // teal-500
            },
        },
    },
    plugins: [],
    darkMode: 'class', // or 'media' if you want to use system preference
}