/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kong: ['kongtext', 'sans-serif'],
        zpix: ['zpix', 'sans-serif']
      },
      spacing: {
        header: '50px'
      }
    },
    colors: {
      main_background: '#162C46',
      error: {
        DEFAULT: '#E60012'
      },
      yellow: {
        DEFAULT: '#F8E71C'
      },
      light_gray: {
        DEFAULT: '#e5e7eb'
      },
      white: {
        DEFAULT: '#fff'
      }
    }
  },
  plugins: []
}
