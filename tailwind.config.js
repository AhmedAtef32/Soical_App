/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        main: '#193CB8',
        body_color: '#EEEEEE',
      },
      container : {
        center: true
      }
    }

  },
  plugins: [
    require('flowbite/plugin') ,
  ],
  darkMode:"selector",
}

