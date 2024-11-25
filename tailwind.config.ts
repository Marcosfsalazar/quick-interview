import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        appGreen: 'var(--appGreen)',
        appAquamarine: 'var(--appAquamarine)',
        appLightGreen: 'var(--appLightGreen)',
        appPurple: 'var(--appPurple)',
      },
    },
  },
  plugins: [],
};
export default config;
