/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        wfvisuals: ['WFVisuals','arial'],
        wfvisualstext: ['WFVisualstext','arial']
      }
    },
  },
  plugins: [
    plugin(function ({addUtilities}){
      addUtilities({
        ".scrollbar-hide":{
          "-ms-overflow-style": "none", /* IE and Edge */
          "scrollbar-width": "none",    /* Firefox */
        },
      })
    })
  ],
}

