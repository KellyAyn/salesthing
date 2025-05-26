import type { Config } from 'tailwindcss';

const config = {
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('tailwindcss-animate'),
  ],
} satisfies Config;

export default config;
