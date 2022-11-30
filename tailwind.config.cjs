/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {backgroundImage: {
      'img': "url('./qatar_wc.jpg')",
      'wcup': "url('./wcup.png')",
      }},
      
      fontSize: {
          xd: '0.5rem',
          sm: '0.8rem',
          base: '1rem',
          xl: '1.25rem',
          '2xl': '1.563rem',
          '3xl': '1.953rem',
          '4xl': '2.441rem',
          '5xl': '3.052rem',
        
      }  
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
