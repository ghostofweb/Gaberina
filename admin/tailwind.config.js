/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1E1E1E', // Dark Charcoal / Black (Background, Navbar, Footer)
        lighterDark: '#2A2A2A', // Slightly Lighter Dark (Dropdowns, Subtle Overlays, Modals)
        gold: '#CFC4B9', // Gold (Buttons, Accents, Highlights)
        champagne: '#BFA253', // Alternative Gold (Hover States, Secondary Highlights)
        ivory: '#FFF8E7', // Ivory / Cream (Background for Cards, Subtle Contrast Areas)
        brown: '#6A4E42', // Deep Brown (Text, Borders, Subtle Dividers)
        roseGold: '#B76E79', // Muted Rose Gold (Accents, Icons, Highlights)
        lightRoseGold: '#D19E9E', // Muted Rose Gold (lighter) (Backgrounds for Badges, Subtle Highlights)
        white: '#FFFFFF', // Pure White (Main Text, Icons, High Contrast Areas)
        lightGray: '#D9D9D9', // Warm Light Gray (Borders, Placeholder Text, Subtle Dividers)
        buttontxt:'#FDFBF6',
        buttonhvr:'#D4AF37CC'
      },
    },
    fontFamily: {
      default: ['Montserrat', 'sans-serif'],
      'times': ['Times New Roman', 'serif'],
    },
  },
  plugins: [],
};
