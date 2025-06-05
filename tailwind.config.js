/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      keyframes: {
        fall: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-20px)', opacity: '0' },
        },
        wave: {
          '0%': { transform: 'translateX(-100%) rotate(50deg)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%) rotate(120deg)' },
        },
        slideUpFade: {
          '0%': { opacity: '1', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        fall: 'fall 0.3s ease-out forwards',
        fadeIn: 'fadeIn 0.3s ease-in-out',
        fadeOut: 'fadeOut 0.4s ease-in-out',
        skeleton: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        wave: 'wave 1.5s linear infinite',
        slideUpFade: 'slideUpFade 0.6s ease-out',
      },
      backgroundImage: {
        "custom-gradient": 'linear-gradient(135deg,rgb(48, 100, 77), #51B587)',
        "background-gradient": 'linear-gradient(135deg, #51B587, #F77F00)',
        "not-found-radial": 'radial-gradient(rgb(3, 0, 56), rgba(36, 0, 33, 0.26));'
      },
      colors: {
        "rose-shadow": "#ff0051",
        "rose-shadow-dark": "#ff0051e8",
        "green-dark": "#1D4232",
        "soft-green": "#449c74"
      }
    },
  },
  plugins: [],
}

