import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        '60vh': '60vh',
      },
      padding: {
        '10-20': '10% 20%',
      }
    },
  },
  plugins: [],
}
export default config
